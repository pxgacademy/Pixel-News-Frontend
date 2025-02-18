import PropTypes from "prop-types";
import { FaEye } from "react-icons/fa";

const ViewCountBadge = ({ count }) => {
  return (
    <span className="absolute z-10 shadow-md right-5 top-5 flex items-center gap-x-2 rounded-lg bg-white text-gray-800 py-1 px-3 cursor-default">
      <span>
        <FaEye />
      </span>
      <span>{count}</span>
    </span>
  );
};

ViewCountBadge.propTypes = {
  count: PropTypes.number.isRequired,
};

export default ViewCountBadge;
