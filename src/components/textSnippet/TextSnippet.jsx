import PropTypes from "prop-types";

const TextSnippet = ({ text, length = 100 }) => {
  const shortText =
    text.length > length ? text.substring(0, length) + "..." : text;

  return <span>{shortText}</span>;
};

TextSnippet.propTypes = {
  text: PropTypes.string.isRequired,
  length: PropTypes.number,
};

export default TextSnippet;
