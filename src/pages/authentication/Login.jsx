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
      validation: {
        required: true,
        minLength: 6,
        maxLength: 20,
        pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*[0-9])/,
      },
      errorMessages: {
        required: "Password is required",
        minLength: "Password must be more than 6 characters",
        maxLength: "Password must be less than 20 characters",
        pattern:
          "Password must include one uppercase, one lowercase, one number, and one special character",
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
      <div className="w-full max-w-lg mx-auto mt-6">
        <HookForm fields={fields} onSubmit={handleSubmit} btnName="Login" />
      </div>
    </SectionContainer>
  );
};

export default Login;
