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
import usePatch from "../../../hooks/usePatch";

const AllArticlesTableRow = ({ article, serial, refetch }) => {
  const [handleDelete] = useDelete();
  const [handleUpdate] = usePatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    _id,
    title,
    status,
    isPaid,
    date,
    creator,
    publisher,
    userInfo,
  } = article || {};

  const handleModal = (action) => {
    setIsModalOpen(action);
  };

  const handleDeleteArticle = () => {
    handleDelete({
      link: `/articles/${_id}`,
      refetch: refetch,
      //   questionText: title,
      questionText: `You are about to delete "${title}!"`,
      successText: "Article has been deleted.",
    });
  };

  const handleArticleApprove = () => {
    handleUpdate({
      link: `/articles/status-update/${_id}`,
      data: { status: "approved" },
      refetch: refetch,
      questionTitle: "Are you sure?",
      questionText: `You are about to approve "${title}!"`,
      successTitle: "Updated!",
      successText: `"${title}" is approved!`,
    });
  };

  const handleArticlePremium = () => {
    handleUpdate({
      link: `/articles/status-update/${_id}`,
      data: { isPaid: true },
      refetch: refetch,
      questionTitle: "Are you sure?",
      questionText: `You are about to make premium "${title}!"`,
      successTitle: "Updated!",
      successText: `"${title}" is premium now!`,
    });
  };

  const handleStatusDecline = (e) => {
    e.preventDefault();
    handleModal(false);
    const decline_message = e.target.decline_message.value;
    handleUpdate({
      link: `/articles/status-update/${_id}`,
      data: { status: "declined", decline_message },
      refetch: refetch,
      questionTitle: "Are you sure?",
      questionText: `You are about to decline "${title}!"`,
      successTitle: "Updated!",
      successText: `"${title}" is declined!`,
    });
    e.target.reset();
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
            <button
              onClick={handleArticleApprove}
              className="rounded-full p-1 text-lg bg-green-600/50 text-white"
            >
              <IoCheckmarkSharp />
            </button>
          )}
        </td>

        <td className="text-center">
          <button
            onClick={() => handleModal(true)}
            disabled={status === "declined"}
            className={`btn btn-sm btn-circle text-white btn-warning disabled:bg-error disabled:text-white`}
          >
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
              <IoDiamondSharp />
            </span>
          ) : (
            <button
              onClick={handleArticlePremium}
              className="text-white bg-blue-700 p-1 inline-block rounded-full text-lg"
            >
              <IoClose />
            </button>
          )}
        </td>
      </tr>
      {isModalOpen && (
        <dialog
          open
          id="my_modal"
          className="modal modal-bottom sm:modal-middle md:w-[600px] mx-auto"
        >
          <div className="modal-box text-center">
            <div className="relative">
              <button
                onClick={() => handleModal(false)}
                className="absolute -right-3 -top-3 btn btn-sm btn-circle text-black"
              >
                <IoClose />
              </button>
            </div>
            <h4 className="font-semibold text-2xl mb-2">
              Write Decline Reasons
            </h4>
            <form onSubmit={handleStatusDecline}>
              <textarea
                placeholder="Write message here..."
                required
                name="decline_message"
                className="textarea textarea-bordered textarea-sm w-full min-h-40 max-h-60 mt-3"
              />
              <button role="submit" className="btn w-full mt-1">
                Submit
              </button>
            </form>
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
