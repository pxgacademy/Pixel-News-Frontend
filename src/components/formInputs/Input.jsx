import PropTypes from "prop-types";

const Input = ({
  htmlFor,
  label,
  readOnly = false,
  type = "text",
  validation,
  errors,
  placeholder = "Type here",
  labelStyle = "mt-2",
  className = "",
  clearStyle = false,
}) => {
  const inputStyle =
    "bg-white dark:bg-transparent mt-1 border border-darkFive dark:border-darkTwo rounded-lg p-3 w-full outline-none focus:border-darkBlue";
  return (
    <label className={`block ${labelStyle}`}>
      <label htmlFor={htmlFor} className="ml-2">
        {label}
      </label>
      <input
        id={htmlFor}
        readOnly={readOnly}
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

Input.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.string,
  clearStyle: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  validation: PropTypes.object,
  errors: PropTypes.object,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default Input;
