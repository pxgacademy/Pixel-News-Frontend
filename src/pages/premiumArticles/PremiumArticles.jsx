import ArticleCard from "../../components/articleCard/ArticleCard";
import SectionContainer from "../../components/container/SectionContainer";
import Loading from "../../components/loading/Loading";
import { useSecureDataLoader } from "../../hooks/useDataLoader";

const PremiumArticles = () => {
  const [articles = [], isLoading] = useSecureDataLoader("/articles/premium");


  if (isLoading) return <Loading />;
  return (
    <SectionContainer>
      <h2 className="text-4xl font-bold text-center mb-6">Premium Articles</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </SectionContainer>
  );
};

export default PremiumArticles;
