import PropTypes from "prop-types";
import TextSnippet from "../textSnippet/TextSnippet";
import PremiumBadge from "../badges/PremiumBadge";
import ViewCountBadge from "../badges/ViewCountBadge";
import { usePublicAPI } from "../../hooks/useAPI_Links";
import PremiumButton from "../premiumButton/PremiumButton";

const ArticleCard = ({ article }) => {
  const publicAPI = usePublicAPI();
  const { _id, image, title, description, viewCount, publisher, isPaid } =
    article;

  const handleViewCount = async () => {
    await publicAPI.patch(`/articles/view-count/${_id}`, {});
  };

  return (
    <div
      className={`bg-white dark:bg-black/10 p-5 lg:p-3 rounded-xl overflow-hidden flex flex-col shadow-lg relative cursor-default group border ${
        isPaid ? "border-yellow-600/60" : "border-gray-400 dark:border-gray-600"
      }`}
    >
      <ViewCountBadge count={viewCount} />
      {isPaid && <PremiumBadge />}
      <div className="w-full h-72 rounded-lg overflow-hidden">
        <img
          referrerPolicy="no-referrer"
          className="transition-all duration-200 group-hover:scale-[105%] w-full h-full object-cover "
          src={image}
          alt={`image of ${title}`}
        />
      </div>
      <h2 className="mt-3 text-2xl font-semibold font-davidLibre">{title}</h2>
      <p className="mt-2">
        <TextSnippet text={description} length={100} />
      </p>

      <div className="grow mt-3 flex items-center gap-x-2">
        <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded-lg">
        <img
          referrerPolicy="no-referrer"
          className="w-14 max-h-14 object-cover"
          src={publisher?.photo}
          alt=""
        />
        </div>
        <div>
          <p className="underline">Publisher:</p>
          <p className="font-semibold">{publisher.name}</p>
        </div>
      </div>

      <PremiumButton
        onClick={handleViewCount}
        link={`/articles/details/${_id}`}
        isPaid={isPaid}
      />
    </div>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticleCard;
