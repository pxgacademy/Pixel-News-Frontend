import Loading from "../../../../components/loading/Loading";
import PremiumButton from "../../../../components/premiumButton/PremiumButton";
import { usePublicDataLoader } from "../../../../hooks/useDataLoader";
import premiumIcon from "../../../../assets/icons/crown.png";
const Headlines = () => {
  const [articles = [], isLoading] = usePublicDataLoader("/articles/approved");

  const [adsOne, adsTwo] = articles;

  if (isLoading) return <Loading />;
  return (
    <div>
      <h6 className="text-4xl font-bold uppercase mt-2">Headlines</h6>

      <div className="mt-4">
        {articles?.map((article) => (
          <p
            key={article?._id}
            className="flex items-start gap-x-1 border-t border-darkFive py-1"
          >
            <PremiumButton
              link={`/articles/details/${article?._id}`}
              isPaid={article?.isPaid}
              btnText={article?.title}
              paidBtnText={article?.title}
              width=""
              btnStyle="text-xl text-left font-semibold mb-2"
              disabledStyle="text-xl text-left font-semibold mb-2 text-darkThree"
            />
            {article?.isPaid && (
              <img
                referrerPolicy="no-referrer"
                className="w-6"
                src={premiumIcon}
                alt=""
              />
            )}
          </p>
        ))}
      </div>

      <div className="mt-8">
        <img
          referrerPolicy="no-referrer"
          className="w-full"
          src={adsOne.image}
          alt=""
        />

        <p className="text-xl font-semibold mt-4">{adsOne.title}</p>
        <p>{adsOne.description}</p>
      </div>

      <div className="mt-8">
        <img
          referrerPolicy="no-referrer"
          className="w-full"
          src={adsTwo.image}
          alt=""
        />

        <p className="text-xl font-semibold mt-4">{adsTwo.title}</p>
        <p>{adsTwo.description}</p>
      </div>
    </div>
  );
};

export default Headlines;
