import { Link, useLocation, useNavigate } from "react-router-dom";
import SectionContainer from "../../components/container/SectionContainer";
import HookForm from "../../hooks/useHookForm";
import SocialLogin from "./SocialLogin";
import { usePublicAPI } from "../../hooks/useAPI_Links";
import useContextValue from "../../hooks/useContextValue";
import useCreateUser from "../../hooks/useCreateUser";
import Swal from "sweetalert2";
import Loading from "../../components/loading/Loading";
import { useState } from "react";

const Register = () => {
  const imgApi = import.meta.env.VITE_IMGBB_API_LINK;
  const [regLoading, setRegLoading] = useState(false);
  const { createUser, updateUser, setUser } = useContextValue();
  const publicAPI = usePublicAPI();
  const [handleCreateUser, isLoading] = useCreateUser();
  const navigate = useNavigate();
  const { state } = useLocation();

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      validation: {
        required: true,
      },
      errorMessages: {
        required: "Name is required",
      },
      placeholder: "Enter your full name",
    },
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
      placeholder: "Enter your password",
    },
    {
      name: "image",
      label: "Photo",
      type: "file",
      validation: {
        required: true,
      },
      errorMessages: {
        required: "Photo is required",
      },
    },
  ];

  const handleSubmit = async (data, reset) => {
    setRegLoading(true);
    try {
      const imageFile = { image: data.image[0] };
      const { data: res } = await publicAPI.post(imgApi, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res?.data?.display_url) {
        data.image = res.data.display_url;
        const { user } = await createUser(data?.email, data?.password);
        await updateUser({ displayName: data?.name, photoURL: data?.image });
        setUser(user);
        handleCreateUser({
          email: data?.email,
          name: data?.name,
          image: data?.image,
          createdAt: user?.metadata?.createdAt,
          lastLoginAt: user?.metadata?.lastLoginAt,
        });
        reset();
        navigate(state?.goTo || "/");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    } finally {
      setRegLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <SectionContainer>
      <h1 className="text-2xl md:text-4xl font-bold text-center font-davidLibre">
        Welcome to Pixel News!
      </h1>
      <div className="w-full max-w-lg mx-auto mt-6 bg-white p-6 rounded-xl shadow-xl">
        {/* social login */}
        <SocialLogin />

        <div className="divider my-6">or register with</div>
        <HookForm
          fields={fields}
          onSubmit={handleSubmit}
          btnName={
            regLoading ? (
              <span className="loading loading-spinner text-white"></span>
            ) : (
              <span>Login</span>
            )
          }
          disabled={regLoading}
        />
        <p className="text-center text-sm mt-2">
          Already have an account? Please{" "}
          <Link to="/login" className="text-info">
            Login
          </Link>
        </p>
      </div>
    </SectionContainer>
  );
};

export default Register;
