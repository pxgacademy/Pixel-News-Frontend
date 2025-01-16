import PropTypes from "prop-types";
import loaderGif from "../../assets/lottie/Loading.json";
import Lottie from "lottie-react";

const Loading = ({
  width = "w-full",
  minWidth = "",
  maxWidth = "",
  height = "h-full",
  minHeight = "min-h-[650px]",
  maxHeight = "",
  className = "",
}) => {
  const style = `${width} ${minWidth} ${maxWidth} ${height} ${minHeight} ${maxHeight} ${className}`;

  return (
    <section className={`${style} flex items-center justify-center`}>
      <Lottie animationData={loaderGif} loop={true} />
    </section>
  );
};

Loading.propTypes = {
  width: PropTypes.string,
  minWidth: PropTypes.string,
  maxWidth: PropTypes.string,
  height: PropTypes.string,
  minHeight: PropTypes.string,
  maxHeight: PropTypes.string,
  className: PropTypes.string,
};

export default Loading;
