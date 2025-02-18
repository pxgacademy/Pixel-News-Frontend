import { Helmet } from "react-helmet";
import ArticleCard from "../../components/articleCard/ArticleCard";
import SectionContainer from "../../components/container/SectionContainer";
import Loading from "../../components/loading/Loading";
import { useSecureDataLoader } from "../../hooks/useDataLoader";
import useContextValue from "../../hooks/useContextValue";

const PremiumArticles = () => {
  const { loading } = useContextValue();
  const [articles = [], isLoading] = useSecureDataLoader("/articles/premium");

  if (isLoading || loading) return <Loading />;
  return (
    <SectionContainer header="Premium Articles">
      <Helmet>
        <title>Premium Articles | Pixel News</title>
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </SectionContainer>
  );
};

export default PremiumArticles;
