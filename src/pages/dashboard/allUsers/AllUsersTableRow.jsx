import PropTypes from "prop-types";
import usePatch from "../../../hooks/usePatch";

const AllUsersTableRow = ({ singleUser, serial, refetch }) => {
  const [handleUpdate] = usePatch();
  const { name, email, image, isAdmin } = singleUser || {};

  const handleMakeAdmin = () => {
    handleUpdate({
      link: `/users/role/update/${email}`,
      data: { isAdmin: true },
      refetch: refetch,
      questionTitle: "Are you sure?",
      questionText: `You are about to make admin to ${name}!`,
      successTitle: "Updated!",
      successText: `${name} is admin now!`,
    });
  };

  return (
    <>
      <tr>
        <th>{serial}</th>
        <td className="min-w-14">
          <div className="w-12 h-12">
            <img
              className="w-full h-full object-cover rounded-md"
              src={image}
              alt=""
            />
          </div>
        </td>
        <td className="min-w-36">{name}</td>
        <td className="min-w-36">{email}</td>
        <td className="text-center">
          {isAdmin ? (
            <span className="bg-green-600 px-4 py-2 rounded-full text-white cursor-default">
              Admin
            </span>
          ) : (
            <button
              onClick={handleMakeAdmin}
              className="bg-rose-600 px-4 py-2 rounded-full text-white"
            >
              Make Admin
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

AllUsersTableRow.propTypes = {
  singleUser: PropTypes.object.isRequired,
  serial: PropTypes.number.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default AllUsersTableRow;
