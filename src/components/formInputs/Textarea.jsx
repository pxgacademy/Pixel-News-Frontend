import PropTypes from "prop-types";

const Textarea = ({
  htmlFor,
  label,
  type = "text",
  validation,
  errors,
  placeholder = "Type here",
  labelStyle = "mt-2",
  className = "",
  clearStyle = false,
}) => {
  const inputStyle =
    "w-full bg-white mt-1 border border-darkFive rounded-lg p-3 outline-none focus:border-darkBlue";
  return (
    <label className={`block ${labelStyle}`}>
      <label htmlFor={htmlFor} className="ml-2">
        {label}
      </label>
      <textarea
        id={htmlFor}
        type={type}
        placeholder={placeholder}
        {...validation}
        className={`${!clearStyle && inputStyle} ${className}`}
      />
      {errors && errors[htmlFor]?.type === "required" && (
        <span className="text-error inline-block mt-1 ml-2 lowercase">
          {label} is required
        </span>
      )}
    </label>
  );
};

Textarea.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.string,
  clearStyle: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  validation: PropTypes.object,
  errors: PropTypes.object,
  className: PropTypes.string,
};

export default Textarea;
