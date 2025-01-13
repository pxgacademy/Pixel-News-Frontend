import { Link } from "react-router-dom";
import SectionContainer from "../../components/container/SectionContainer";
import HookForm from "../../hooks/useHookForm";

const Login = () => {
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
    },
  ];

  const handleSubmit = (data, reset) => {
    console.log(data);
    reset();
  };

  return (
    <SectionContainer>
      <h1 className="text-2xl md:text-4xl font-bold text-center font-davidLibre">
        Welcome Back!
      </h1>
      <div className="w-full max-w-lg mx-auto mt-6 bg-white p-6 rounded-xl shadow-xl">
        <HookForm fields={fields} onSubmit={handleSubmit} btnName="Login" />
        <p className="text-center text-sm mt-2">
          Do not have an account? Please{" "}
          <Link to="/register" className="text-info">
            Register
          </Link>
        </p>
      </div>
    </SectionContainer>
  );
};

export default Login;
