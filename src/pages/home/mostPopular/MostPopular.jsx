import Loading from "../../../components/loading/Loading";
import PremiumButton from "../../../components/premiumButton/PremiumButton";
import { usePublicDataLoader } from "../../../hooks/useDataLoader";

const MostPopular = () => {
  const [data = [], isLoading] = usePublicDataLoader("/articles/most-popular");

  const [common, ...articles] = data || [];

  if (isLoading) return <Loading />;
  return (
    <div className="px-5 lg:px-10">
      <h3 className="text-xl font-semibold mb-3">Most Popular</h3>
      <div className="lg:flex">
        <div className="flex-1 flex items-end justify-start relative min-h-96 md:min-h-[400px] lg:min-h-[460px] max-h-[500px]">
          <img
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            src={common?.image}
            alt=""
          />
          <div className="absolute w-full bg-gradient-to-t from-white to-white/20 p-5">
            <p className="text-xl font-semibold">{common?.title}</p>
            <p>
              Published At:{" "}
              <span className="font-semibold">
                {new Date(common?.date).toLocaleDateString()}
              </span>{" "}
              by{" "}
              <span className="font-semibold text-blue-500">
                {common?.publisher?.name}
              </span>
            </p>
            <div className="flex justify-end">
              <PremiumButton
                link={`/articles/details/${common?._id}`}
                isPaid={common?.isPaid}
                btnText="Read More"
                width=""
                btnStyle="text-blue-600 underline"
                disabledStyle="text-error"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 grid md:grid-cols-2">
          {articles.map((article) => (
            <div
              key={article?._d}
              className="flex-1 flex items-end justify-start relative min-h-96 md:min-h-[200px] lg:min-h-[230px] lg:max-h-[250px]"
            >
              <img
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                src={article?.image}
                alt=""
              />
              <div className="absolute w-full bg-gradient-to-t from-white to-white/20 p-5 lg:p-1">
                <p className="text-xl  lg:text-base font-semibold">
                  {article?.title}
                </p>
                <p className="text-base lg:text-sm">
                  Published At:{" "}
                  <span className="font-semibold">
                    {new Date(article?.date).toLocaleDateString()}
                  </span>{" "}
                  by{" "}
                  <span className="font-semibold text-blue-500">
                    {article?.publisher?.name}
                  </span>
                </p>
                <div className="flex justify-end">
                  <PremiumButton
                    link={`/articles/details/${article?._id}`}
                    isPaid={article?.isPaid}
                    btnText="Read More"
                    width=""
                    btnStyle="text-blue-600 underline"
                    disabledStyle="text-error"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostPopular;
