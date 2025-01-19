import PropTypes from "prop-types";
import useContextValue from "../../hooks/useContextValue";
import { Link } from "react-router-dom";

const PremiumButton = ({
  isPaid = false,
  link = "",
  btnText = "Details",
  paidBtnText = "Get premium to see",
  onClick,
}) => {
  const { userRole } = useContextValue();

  if (isPaid && !userRole.isPremium) {
    if (userRole.isAdmin) {
      return (
        <Link to={`/articles/details/${link}`}>
          <button
            onClick={onClick && onClick}
            className="mt-4 btn btn-info text-white w-full"
          >
            {btnText}
          </button>
        </Link>
      );
    } else {
      return (
        <button
          disabled
          className="mt-4 btn w-full disabled:text-darkTwo disabled:cursor-not-allowed"
        >
          {paidBtnText}
        </button>
      );
    }
  } else {
    return (
      <Link to={`/articles/details/${link}`}>
        <button
          onClick={onClick && onClick}
          className="mt-4 btn btn-info text-white w-full"
        >
          {btnText}
        </button>
      </Link>
    );
  }
};

PremiumButton.propTypes = {
  isPaid: PropTypes.bool,
  link: PropTypes.string,
  btnText: PropTypes.string,
  paidBtnText: PropTypes.string,
  onClick: PropTypes.func,
};

export default PremiumButton;
