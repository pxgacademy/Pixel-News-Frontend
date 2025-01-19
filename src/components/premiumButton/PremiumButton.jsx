import PropTypes from "prop-types";
import useContextValue from "../../hooks/useContextValue";
import { Link } from "react-router-dom";

const PremiumButton = ({
  isPaid = false,
  link = "",
  btnText = "Details",
  paidBtnText = "Get premium to see",
  onClick,
  width = "w-full",
  btnStyle = "mt-4 btn btn-info text-white",
  disabledStyle = "mt-4 btn disabled:text-darkTwo disabled:cursor-not-allowed",
}) => {
  const { userRole } = useContextValue();

  if (isPaid && !userRole.isPremium) {
    if (userRole.isAdmin) {
      return (
        <Link to={link}>
          <button
            onClick={onClick && onClick}
            className={`${btnStyle} ${width}`}
          >
            {btnText}
          </button>
        </Link>
      );
    } else {
      return (
        <button disabled className={`${disabledStyle} ${width}`}>
          {paidBtnText}
        </button>
      );
    }
  } else {
    return (
      <Link to={link}>
        <button onClick={onClick && onClick} className={`${btnStyle} ${width}`}>
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
  btnStyle: PropTypes.string,
  disabledStyle: PropTypes.string,
  width: PropTypes.string,
};

export default PremiumButton;
