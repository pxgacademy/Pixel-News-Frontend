import PropTypes from "prop-types";
import TextSnippet from "../textSnippet/TextSnippet";
import { Link } from "react-router-dom";
import useContextValue from "../../hooks/useContextValue";
import PremiumBadge from "../badges/PremiumBadge";
import ViewCountBadge from "../badges/ViewCountBadge";

const ArticleCard = ({ article }) => {
  const { userRole } = useContextValue();
  const { _id, image, title, description, viewCount, publisher, isPaid } =
    article;

  return (
    <div
      className={`bg-white p-3 rounded-xl overflow-hidden flex flex-col shadow-lg relative cursor-default ${
        isPaid && "border border-yellow-600"
      }`}
    >
      <ViewCountBadge count={viewCount} />
      {isPaid && <PremiumBadge />}
      <img className="w-full h-72 object-cover rounded-lg" src={image} alt="" />
      <h2 className="mt-3 text-2xl font-semibold font-davidLibre">{title}</h2>
      <p className="mt-2">
        <TextSnippet text={description} />
      </p>

      <div className="grow mt-3 flex items-center gap-x-2">
        <img
          className="w-14 max-h-10 object-cover"
          src={publisher?.photo}
          alt=""
        />
        <div>
          <p className="underline">Publisher:</p>
          <p className="font-semibold">{publisher.name}</p>
        </div>
      </div>

      {isPaid && !userRole.isPremium ? (
        <button
          disabled
          className="mt-4 btn w-full disabled:text-darkTwo disabled:cursor-not-allowed"
        >
          Get premium to see
        </button>
      ) : (
        <Link to={`/articles/details/${_id}`}>
          <button className="mt-4 btn btn-info text-white w-full">
            Details
          </button>
        </Link>
      )}
    </div>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticleCard;
