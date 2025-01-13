import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const HookForm = ({
  fields,
  onSubmit,
  defaultValues = {},
  btnName,
  btnStyle = "btn btn-info text-white mt-4 w-full",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label htmlFor={field.name} className="ml-2">
            {field.label}
          </label>
          <input
            id={field.name}
            type={field?.type || "text"}
            placeholder={field?.placeholder || "type here"}
            {...register(field.name, field.validation)}
            className="bg-white mt-1 border border-darkFive rounded-lg p-3 w-full outline-none focus:border-darkBlue"
          />
          {errors[field.name] && (
            <div className="text-red-500 text-sm mt-1 space-y-1">
              {field.errorMessages &&
                Object.entries(field.errorMessages).map(([key, message]) =>
                  errors[field.name]?.type === key ? <p key={key}>{message}</p> : null
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
