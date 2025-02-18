import PropTypes from "prop-types";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import reactSelectOptions from "./ReactSelectOptions";
import useContextValue from "../../hooks/useContextValue";

const animatedComponents = makeAnimated();

const ReactSelect = ({ field }) => {
  const { isDark } = useContextValue();



  // Custom styles
  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: isDark ? "transparent" : "white",
      color: isDark ? "white" : "#1F2937", // text-gray-800
      borderColor: isDark ? "#484D56" : "#C9CBD0", // gray-600 / gray-200
      boxShadow: "none",
      // "&:hover": {
      //   borderColor: isDarkMode ? "#6B7280" : "#9CA3AF", // gray-500 / gray-400
      // },
      height: '50px',
      borderRadius: '10px',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDark ? "#1F2937" : "white", // dark:bg-gray-800, light:bg-white
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? isDark
          ? "#374151" // gray-700
          : "#E5E7EB" // gray-200
        : isFocused
        ? isDark
          ? "#4B5563" // gray-600
          : "#F3F4F6" // gray-100
        : "transparent",
      color: isDark ? "white" : "#1F2937",
    }),
    singleValue: (base) => ({
      ...base,
      color: isDark ? "white" : "#1F2937",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: isDark ? "#4B5563" : "#E5E7EB",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: isDark ? "white" : "#1F2937",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: isDark ? "white" : "#1F2937",
      ":hover": {
        backgroundColor: "#EF4444", // red-500
        color: "white",
      },
    }),
  };

  return (
    <Select
      options={reactSelectOptions}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      styles={customStyles}
      {...field}
    />
  );
};

ReactSelect.propTypes = {
  field: PropTypes.object.isRequired,
};

export default ReactSelect
