import PropTypes from "prop-types";
import useDelete from "../../../hooks/useDelete";
import { useState } from "react";
import { FaLock, FaTrashAlt } from "react-icons/fa";
import {
  IoCheckmarkDoneSharp,
  IoCheckmarkSharp,
  IoClose,
  IoDiamondSharp,
} from "react-icons/io5";

const AllArticlesTableRow = ({ article, serial, refetch }) => {
  const [handleDelete] = useDelete();
  const {
    _id,
    title,
    status,
    isPaid,
    date,
    decline_message,
    creator,
    publisher,
    userInfo,
  } = article || {};
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = (action) => {
    setIsModalOpen(action);
  };

  const handleDeleteArticle = () => {
    handleDelete({
      link: `/articles/${_id}`,
      refetch: refetch,
      //   questionText: title,
      questionText: "You will not be able to recover this article!",
      successText: "Article has been deleted.",
    });
  };

  return (
    <>
      <tr>
        <th>{serial}</th>
        <td className="min-w-72">
          <div className="flex gap-x-3 items-center">
            <img
              className="w-12 h-12 rounded-md"
              src={userInfo?.image}
              alt=""
            />
            <div>
              <p>{userInfo?.name}</p>
              <p>{creator}</p>
            </div>
          </div>
        </td>
        <td className="min-w-72">
          <p>T: {title}</p>
          <p>P: {publisher?.name}</p>
        </td>
        <td>
          <p
            className={`${
              status === "approved" ? "text-green-600" : "text-error"
            }`}
          >
            {status}
          </p>
          <p>{new Date(date).toLocaleDateString()}</p>
        </td>
        <td className="text-center capitalize">
          {status === "approved" ? (
            <span className="inline-block rounded-full p-1 text-lg bg-green-600 text-white cursor-default">
              <IoCheckmarkDoneSharp />
            </span>
          ) : (
            <button className="rounded-full p-1 text-lg bg-green-600/50 text-white">
              <IoCheckmarkSharp />
            </button>
          )}
        </td>

        <td className="text-center">
          <button className="btn btn-sm btn-warning btn-circle text-white">
            <FaLock />
          </button>
        </td>

        <td className="text-center">
          <button
            onClick={handleDeleteArticle}
            className="btn btn-sm bg-red-500 hover:bg-red-600 text-white btn-circle"
          >
            <FaTrashAlt />
          </button>
        </td>
        <td className="text-center">
          {isPaid ? (
            <span className="text-white bg-green-600 p-1 inline-block rounded-full text-lg">
              <IoCheckmarkDoneSharp />
            </span>
          ) : (
            <button className="text-white bg-blue-700 p-1 inline-block rounded-full text-lg">
              <IoDiamondSharp />
            </button>
          )}
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

AllArticlesTableRow.propTypes = {
  article: PropTypes.object.isRequired,
  serial: PropTypes.number.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default AllArticlesTableRow;
