import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const HookForm = ({
  fields,
  onSubmit,
  defaultValues = {},
  btnName,
  btnStyle = "btn btn-info text-white mt-4 w-full",
}) => {
  const [isEye, setIsEye] = useState(false);

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const handleFormSubmit = (data) => {
    onSubmit(data, reset);
  };

  const handleEye = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEye(!isEye);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label htmlFor={field.name} className="ml-2">
            {field.label}
          </label>
          {field?.fieldType === "textarea" ? (
            <textarea
              id={field.name}
              type={field?.type || "text"}
              placeholder={field?.placeholder || "type here"}
              {...register(field.name, field.validation)}
              className="bg-white mt-1 border border-darkFive rounded-lg p-3 w-full outline-none focus:border-darkBlue"
            />
          ) : (
            <label className="relative">
              <input
                id={field.name}
                type={
                  field?.isEye
                    ? isEye
                      ? "text"
                      : "password"
                    : field?.type || "text"
                }
                placeholder={field?.placeholder || "type here"}
                {...register(field.name, field.validation)}
                className="bg-white mt-1 border border-darkFive rounded-lg p-3 w-full outline-none focus:border-darkBlue"
              />
              {field?.isEye && (
                <button
                  onClick={(e) => handleEye(e)}
                  className="absolute right-4 bottom-4"
                >
                  {isEye ? <FaEyeSlash /> : <FaEye />}
                </button>
              )}
            </label>
          )}
          {errors[field.name] && (
            <div className="text-red-500 text-sm mt-1 space-y-1">
              {field.errorMessages &&
                Object.entries(field.errorMessages).map(([key, message]) =>
                  errors[field.name]?.type === key ? (
                    <p key={key}>{message}</p>
                  ) : null
                )}
            </div>
          )}
        </div>
      ))}
      <div className="text-center">
        <button type="submit" className={`${btnStyle}`}>
          {btnName}
        </button>
      </div>
    </form>
  );
};

HookForm.propTypes = {
  fields: PropTypes.array.isRequired,
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  btnName: PropTypes.string.isRequired,
  btnStyle: PropTypes.string,
};

export default HookForm;
