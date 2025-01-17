import ArticleCard from "../../components/articleCard/ArticleCard";
import SectionContainer from "../../components/container/SectionContainer";
import Loading from "../../components/loading/Loading";
import { usePublicDataLoader } from "../../hooks/useDataLoader";

const AllArticles = () => {
  const [articles = [], isLoading] = usePublicDataLoader("/articles/approved");

  if (isLoading) return <Loading />;
  return (
    <SectionContainer header="All Articles">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </SectionContainer>
  );
};

export default AllArticles;
