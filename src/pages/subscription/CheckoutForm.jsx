import PropTypes from "prop-types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useSecureAPI } from "../../hooks/useAPI_Links";
import useContextValue from "../../hooks/useContextValue";

const CheckoutForm = ({ priceAndTime = {}, handleModal }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [isCopyTrx, setIsCopyTrx] = useState(false);
  const [trxId, setTrxId] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const secureAPI = useSecureAPI();
  const { user } = useContextValue();

  useEffect(() => {
    const getStripeSecret = async () => {
      if (priceAndTime.price <= 0) return setClientSecret(null);
      setProcessing(true);
      try {
        const { data } = await secureAPI.post("/create-payment-intent", {
          price: priceAndTime.price,
        });
        setClientSecret(data.clientSecret);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setProcessing(false);
      }
    };
    getStripeSecret();
  }, [secureAPI, priceAndTime?.price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      setProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) setErrorMessage(error.message);
    else console.log("[paymentMethod]", paymentMethod);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setProcessing(false);
      setErrorMessage(error.message);
    } else {
      //   console.log("[paymentIntent]", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // save the payment history in the database
        const history = {
          email: user?.email,
          priceAndTime: priceAndTime,
          trx_id: paymentIntent.id,
        };

        const { data } = await secureAPI.post(
          "/subscription-histories",
          history
        );
        console.log(data?.paymentHistory?.insertedId);
        console.log(data?.updateUser?.modifiedCount);
        if (data?.paymentHistory?.insertedId && data?.updateUser?.modifiedCount > 0) 
        {
          handleModal(false);
          setProcessing(false);
          setTrxId(paymentIntent.id);
          Swal.fire({
            title: "Payment Successful!",
            text: "Thank you for subscription!",
            icon: "success",
            showConfirmButton: false,
            position: "center",
            timer: 2000,
          });
        }
      }
    }
  };

  const handleCopyTrxId = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(trxId);
    setIsCopyTrx(true);
    setTimeout(() => {
      setIsCopyTrx(false);
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 bg-white p-2 rounded-lg mx-auto"
    >
      <div className="border border-gray-300 p-3 rounded-md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                fontFamily: "sans-serif",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          className="StripeElement"
        />
      </div>
      {processing && (
        <progress className="progress progress-info  w-full "></progress>
      )}
      <button
        type="submit"
        disabled={!stripe || !elements || !clientSecret || processing || trxId}
        className="bg-info text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-500  active:scale-[99%] active:translate-y-[1px] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:active:scale-100 disabled:active:translate-y-0 transition-colors duration-300"
      >
        Pay
      </button>
      {errorMessage && (
        <p className="text-error normal-case text-sm">{errorMessage}</p>
      )}
      {trxId && (
        <div className="normal-case text-sm cursor-default space-y-2 relative">
          <p>Your payment was successful. Thank you for subscription!</p>
          <p>
            Your TrxID is:{" "}
            <button onClick={(e) => handleCopyTrxId(e)} className="text-info">
              {trxId}{" "}
              {isCopyTrx && (
                <span className="bg-slate-600 px-1 py-[2px] text-white rounded">
                  Copied!
                </span>
              )}
            </button>
          </p>
        </div>
      )}
    </form>
  );
};

CheckoutForm.propTypes = {
  priceAndTime: PropTypes.object.isRequired,
  handleModal: PropTypes.func,
};

export default CheckoutForm;
