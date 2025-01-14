import PropTypes from "prop-types";
import loaderGif from "../../assets/loading/loader3.gif";

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
      <img src={loaderGif} alt="Loading...." />
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
