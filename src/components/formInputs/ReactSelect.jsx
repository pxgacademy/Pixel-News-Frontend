import PropTypes from "prop-types";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import reactSelectOptions from "./ReactSelectOptions";
const animatedComponents = makeAnimated();

const ReactSelect = ({ field }) => {
  return (
    <Select
      options={reactSelectOptions}
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      {...field}
    />
  );
};

ReactSelect.propTypes = {
  field: PropTypes.object.isRequired,
};

export default ReactSelect;
