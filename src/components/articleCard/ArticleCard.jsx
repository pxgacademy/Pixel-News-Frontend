import PropTypes from "prop-types";
import TextSnippet from "../textSnippet/TextSnippet";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const { _id, image, title, description, viewCount, publisher } = article;

  return (
    <div className="bg-white p-3 rounded-xl overflow-hidden flex flex-col shadow-lg relative cursor-default">
        <p className="absolute right-5 top-5 flex items-center gap-x-2 rounded-lg bg-white py-1 px-3">
            <span><FaEye/></span>
            <span>{viewCount}</span>
        </p>
      <img
        className="w-full max-h-72 object-cover rounded-lg"
        src={image}
        alt=""
      />
      <h2 className="mt-3 text-2xl font-semibold font-davidLibre">{title}</h2>
      <p className="mt-2">
        <TextSnippet text={description} />
      </p>
      <p className="mt-3 underline">Publisher:</p>
      <p>Name: {publisher.name}</p>
      <p className="grow">Email: {publisher.email}</p>

      <Link to={`/articles/details/${_id}`}><button className="mt-4 btn w-full">Details</button></Link>
    </div>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticleCard;
