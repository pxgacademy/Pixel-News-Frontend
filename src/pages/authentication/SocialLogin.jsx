import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import useContextValue from "../../hooks/useContextValue";
import Swal from "sweetalert2";
import useCreateUser from "../../hooks/useCreateUser";
import Loading from "../../components/loading/Loading";

import googleIcon from "../../assets/icons/google.png";
import facebookIcon from "../../assets/icons/facebook.png";
import githubIcon from "../../assets/icons/github.webp";

const SocialLogin = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { setUser, googleSignIn } = useContextValue();
  const [handleCreateUser, isLoading] = useCreateUser();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn().then((result) => {
        const user = result.user;
        handleCreateUser({
          email: user?.email,
          name: user?.displayName || "",
          image: user?.photoURL || "",
          createdAt: user?.metadata?.createdAt,
          lastLoginAt: user?.metadata?.lastLoginAt,
        });
        setUser(user);
        navigate(state?.goTo || "/");
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  if (isLoading) return <Loading minHeight="" />;

  return (
    <div>
      <div className="flex items-center justify-center mt-3 gap-x-6">
        <button
          onClick={handleGoogleSignIn}
          className="w-10 h-10 rounded-full overflow-hidden"
        >
          <img
            className="w-full h-full object-cover"
            src={googleIcon}
            alt="G"
          />
        </button>
        <button className="w-10 h-10 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={githubIcon}
            alt="G"
          />
        </button>
        <button className="w-10 h-10 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={facebookIcon}
            alt="F"
          />
        </button>
      </div>
    </div>
  );
};

SocialLogin.propTypes = {
  text: PropTypes.string,
};

export default SocialLogin;
