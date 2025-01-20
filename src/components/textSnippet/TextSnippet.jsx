import PropTypes from "prop-types";

const TextSnippet = ({ text, length = 100 }) => {
  const limit = length || 0;
  const shortText =
    text.length > length ? text.substring(0, limit) + "..." : text;

  return <span>{shortText}</span>;
};

TextSnippet.propTypes = {
  text: PropTypes.string.isRequired,
  length: PropTypes.number,
};

export default TextSnippet;
