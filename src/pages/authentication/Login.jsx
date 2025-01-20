import { Link, useLocation, useNavigate } from "react-router-dom";
import SectionContainer from "../../components/container/SectionContainer";
import HookForm from "../../hooks/useHookForm";
import SocialLogin from "./SocialLogin";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useEffect, useState } from "react";
import useContextValue from "../../hooks/useContextValue";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser, setUser, } = useContextValue();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [captcha, setCaptcha] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      validation: {
        required: true,
      },
      errorMessages: {
        required: "Email is required",
      },
      placeholder: "Enter your email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      isEye: true,
      validation: { required: true },
      errorMessages: {
        required: "Password is required",
      },
      placeholder: "Enter your password",
    },
  ];

  const handleSubmit = async (data, reset) => {
    if (!validateCaptcha(captcha)) {
      setErrMsg("Captcha didn't match");
      return;
    } else {
      setErrMsg(null);
      setCaptcha("");
    }

    try {
      const { user } = await signInUser(data.email, data.password);
      if (user?.email) {
        setUser(user);
        reset();
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          showConfirmButton: false,
          position: "center",
          timer: 2000,
        });
        navigate(state?.goTo || "/");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Invalid email or password",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <SectionContainer>
      <h1 className="text-2xl md:text-4xl font-bold text-center font-davidLibre">
        Welcome Back!
      </h1>
      <div className="w-full max-w-lg mx-auto mt-6 bg-white p-6 rounded-xl shadow-xl">
        <label id="captcha" className="block mt-5">
          <LoadCanvasTemplate />
          <input
            onChange={(e) => setCaptcha(e.target.value)}
            value={captcha}
            type="text"
            required
            className="bg-white mt-1 border border-darkFive rounded-lg p-3 w-full outline-none focus:border-darkBlue mb-2"
            placeholder="Type the captcha above"
          />
          {errMsg && <p className="text-error">{errMsg}</p>}
        </label>
        <HookForm fields={fields} onSubmit={handleSubmit} btnName="Login" />

        <p className="text-center text-sm mt-2">
          Do not have an account? Please{" "}
          <Link to="/register" className="text-info">
            Register
          </Link>
        </p>

        {/* social login */}
        <div className="divider my-6">or login with</div>
        <SocialLogin />
      </div>
    </SectionContainer>
  );
};

export default Login;
