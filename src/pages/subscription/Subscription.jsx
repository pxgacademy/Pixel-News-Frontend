import banner from "../../assets/images/subscription-banner.jpg";
import mobileBanner from "../../assets/images/mobile_subscription_banner.jpg";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Subscription = () => {
  const [price, setPrice] = useState(0);

  // handle modal
  const handleModal = (action) => {
    const modal = document.getElementById("my_modal_5");
    if (action) modal.showModal();
    else modal.close();
  };


  return (
    <>
      {" "}
      <div className="relative max-w-screen-2xl mx-auto flex md:items-center justify-center md:justify-start">
        <div className="hidden md:block">
          <img className="w-full" src={banner} alt="" />
        </div>
        <div className="md:hidden">
          <img className="w-full" src={mobileBanner} alt="" />
        </div>
        <div className="absolute px-5 md:px-10 max-w-96 md:max-w-[450px] lg:max-w-[600px] pt-36 md:pt-0 text-center md:text-left">
          <h2 className="text-2xl lg:text-4xl font-bold font-davidLibre mb-2">
            Unlock Exclusive Insights with <br /> Pixel News Premium
          </h2>
          <p className="text-sm">
            Elevate your news experience with our Premium Subscription. Access
            exclusive articles, in-depth analysis, and ad-free browsing to stay
            informed and ahead of the curve.
          </p>
          <button
            onClick={() => handleModal(true)}
            className="bg-gradient-to-r from-[#00D7FF] to-[#E7ABFF] rounded-full mt-5 shadow-md px-3 md:px-10 py-1 md:py-3 text-white font-semibold md:font-bold md:text-xl uppercase active:scale-[98%] active:translate-y-[1px]"
          >
            Get Subscription
          </button>
        </div>
      </div>
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle md:w-[600px] mx-auto"
      >
        <div className="modal-box">
          <div className="relative">
            <button
              onClick={() => handleModal(false)}
              className="absolute -right-5 -top-5 btn btn-sm btn-circle text-black"
            >
              <IoClose />
            </button>
          </div>
          <h4 className="text-center font-girassol text-3xl mb-2">Payment</h4>
          <div className="p-2 flex gap-x-3">
            <select
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="select select-bordered w-full max-w-72"
            >
              <option className="hidden" value={0}>
                Select a Period
              </option>
              <option value={2}>1 minute</option>
              <option value={15}>5 days</option>
              <option value={25}>10 days</option>
            </select>
            <label className="relative flex items-center">
              <input
                type="text"
                value={price}
                readOnly
                className="input input-bordered w-full max-w-xs pl-7 text-lg"
              />
              <span className="absolute left-3 text-lg">
                <BsCurrencyDollar />
              </span>
            </label>
          </div>
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm total_price={price} handleModal={handleModal} />
            </Elements>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Subscription;
