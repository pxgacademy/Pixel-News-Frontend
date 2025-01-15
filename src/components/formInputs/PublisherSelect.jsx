import PropTypes from "prop-types";

const PublisherSelect = ({
  htmlFor,
  label,
  options,
  validation,
  errors,
  labelStyle = "mt-2",
  className = "",
  clearStyle = false,
}) => {
  const inputStyle =
    "bg-white mt-1 border border-darkFive rounded-lg p-3 w-full outline-none focus:border-darkBlue";
  return (
    <label className={`block ${labelStyle}`}>
      <label htmlFor={htmlFor} className="ml-2">
        {label}
      </label>

      <select
        className={`${!clearStyle && inputStyle} ${className}`}
        id={htmlFor}
        {...validation}
      >
        {options?.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>

      {errors[htmlFor]?.type === "required" && (
        <span className="text-error inline-block mt-1 ml-2 lowercase">
          {label} is required
        </span>
      )}
    </label>
  );
};

PublisherSelect.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.string,
  clearStyle: PropTypes.bool,
  validation: PropTypes.object,
  errors: PropTypes.object,
  className: PropTypes.string,
  options: PropTypes.array.isRequired,
};



export default PublisherSelect;