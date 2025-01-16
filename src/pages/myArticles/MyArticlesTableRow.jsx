import PropTypes from "prop-types";
import premiumIcon from "../../assets/icons/crown.png";
import closeIcon from "../../assets/icons/close.png";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { TbHandClick } from "react-icons/tb";

const MyArticlesTableRow = ({ article, serial }) => {
  const { title, status, isPaid, decline_message } = article || {};
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = (action) => {
    setIsModalOpen(action);
  };

  return (
    <>
      <tr>
        <th>{serial}</th>
        <td>{title}</td>
        <td className="text-center capitalize">
          {status === "decline" ? (
            <button
              onClick={() => handleModal(true)}
              className="mx-auto capitalize bg-rose-600 py-1 px-3 rounded-full text-white flex items-center gap-x-2"
            >
              {status} <TbHandClick />
            </button>
          ) : (
            <span
              className={`py-1 px-3 rounded-full text-white ${
                status === "pending" ? "bg-violet-600" : "bg-green-600"
              }`}
            >
              {status}
            </span>
          )}
        </td>
        <td>
          {isPaid ? (
            <img className="w-10 mx-auto" src={premiumIcon} />
          ) : (
            <img className="w-10 mx-auto" src={closeIcon} />
          )}
        </td>
        <td className="text-center">
          <button className="btn btn-sm btn-circle btn-info text-white">
            <FaEye />
          </button>
        </td>
        <td className="text-center">
          <button className="btn btn-sm btn-circle btn-accent text-white">
            <FaEdit />
          </button>
        </td>
        <td className="text-center">
          <button className="btn btn-sm btn-warning text-white btn-circle">
            <FaTrashAlt />
          </button>
        </td>
      </tr>
      {status === "decline" && isModalOpen && (
        <dialog
          open
          id="my_modal"
          className="modal modal-bottom sm:modal-middle md:w-[600px] mx-auto"
        >
          <div className="modal-box text-center text-rose-600">
            <div className="relative">
              <button
                onClick={() => handleModal(false)}
                className="absolute -right-3 -top-3 btn btn-sm btn-circle text-black"
              >
                <IoClose />
              </button>
            </div>
            <h4 className="font-semibold text-3xl mb-2">Declined Reason</h4>
            <p>{decline_message}</p>
          </div>
        </dialog>
      )}
    </>
  );
};

MyArticlesTableRow.propTypes = {
  article: PropTypes.object.isRequired,
  serial: PropTypes.number.isRequired,
};

export default MyArticlesTableRow;
