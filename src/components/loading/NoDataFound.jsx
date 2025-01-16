import PropTypes from "prop-types";
import Lottie from "lottie-react";
import notFoundLottie from "../../assets/lottie/DataNotFound_2.json";

const NoDataFound = ({ className = "max-w-96 mt-16" }) => {
  return (
    <div className={`${className} mx-auto`}>
      <Lottie animationData={notFoundLottie} loop={true} />
    </div>
  );
};

NoDataFound.propTypes = {
  className: PropTypes.string,
};

export default NoDataFound;
