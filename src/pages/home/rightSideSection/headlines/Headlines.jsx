import Loading from "../../../../components/loading/Loading";
import PremiumButton from "../../../../components/premiumButton/PremiumButton";
import { usePublicDataLoader } from "../../../../hooks/useDataLoader";

const Headlines = () => {
  const [articles = [], isLoading] = usePublicDataLoader("/articles/approved");

  const [adsOne, adsTwo, adsThree] = articles;

  if (isLoading) return <Loading />;
  return (
    <div>
      <h6 className="text-4xl font-bold uppercase mt-2">Headlines</h6>

      <div className="mt-4">
        {articles.map((article) => (
          <p key={article._id}>
            <PremiumButton
              link={`/articles/details/${article._id}`}
              isPaid={article.isPaid}
              btnText={article.title}
              paidBtnText={article.title}
              width=""
              btnStyle="text-xl text-left font-semibold mb-2"
              disabledStyle="text-xl text-left font-semibold mb-2 text-darkThree"
            />
          </p>
        ))}
      </div>

      <div className="mt-8">
        <img className="w-full" src={adsOne.image} alt="" />

        <p className="text-xl font-semibold mt-4">{adsOne.title}</p>
        <p>{adsOne.description}</p>
      </div>

      <div className="mt-8">
        <img className="w-full" src={adsTwo.image} alt="" />

        <p className="text-xl font-semibold mt-4">{adsTwo.title}</p>
        <p>{adsTwo.description}</p>
      </div>
      <div className="mt-8">
        <img className="w-full" src={adsThree.image} alt="" />

        <p className="text-xl font-semibold mt-4">{adsThree.title}</p>
        <p>{adsThree.description}</p>
      </div>
    </div>
  );
};

export default Headlines;
