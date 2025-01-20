import ViewCountBadge from "../../../components/badges/ViewCountBadge";
import Loading from "../../../components/loading/Loading";
import TextSnippet from "../../../components/textSnippet/TextSnippet";
import { usePublicDataLoader } from "../../../hooks/useDataLoader";
import PremiumButton from "../../../components/premiumButton/PremiumButton";

const TrendingArticles = () => {
  const [data = [], isLoading] = usePublicDataLoader("/slider-articles");

  const [common, ...articles] = data;

  if (isLoading) return <Loading />;
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Trending Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="relative">
          <ViewCountBadge count={common?.viewCount} />
          <img
            referrerPolicy="no-referrer"
            className="w-full min-h-80 object-cover"
            src={common?.image}
            alt=""
          />
          <p className="mt-2">
            Published Date:{" "}
            <span className="font-bold">
              {new Date(common?.date).toLocaleDateString()}
            </span>
          </p>
          <p className="mt-1">
            Published By:{" "}
            <span className="font-bold">{common?.publisher?.name}</span>
          </p>
          <h4 className="text-4xl font-girassol mt-3">{common?.title}</h4>
          <p className="mt-2">
            <TextSnippet text={common?.description} length={250} />
            <PremiumButton
              link={`/articles/details/${common?._id}`}
              isPaid={common?.isPaid}
              btnText="Read More"
              width=""
              btnStyle="text-blue-600 underline"
              disabledStyle="text-error"
            />
          </p>
        </div>

        <div>
          <div className="flex flex-col gap-3">
            {articles.map((article) => (
              <div key={article?._id} className="flex gap-x-2">
                <div className="w-[25%] h-28 border">
                  <img
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    src={article?.image}
                    alt=""
                  />
                </div>
                <div className="w-[75%]">
                  <p>
                    {new Date(article?.date).toLocaleDateString()} by{" "}
                    {article?.publisher?.name}
                  </p>
                  <h5 className="text-lg font-semibold">{article?.title}</h5>
                  <p className="text-sm">
                    <TextSnippet text={article?.description} length={80} />
                    <PremiumButton
                      link={`/articles/details/${article?._id}`}
                      isPaid={article?.isPaid}
                      btnText="Read More"
                      width=""
                      btnStyle="text-blue-600 underline"
                      disabledStyle="text-error"
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingArticles;
