import { useParams } from "react-router-dom";
import { useSecureDataLoader } from "../../hooks/useDataLoader";
import Loading from "../../components/loading/Loading";
import SectionContainer from "../../components/container/SectionContainer";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article = {}, isLoading] = useSecureDataLoader(`/articles/${id}`);
  const { date, image, title, description, viewCount, category, publisher } =
    article;

  if (isLoading) return <Loading />;
  return (
    <SectionContainer>
      <div className="max-w-3xl mx-auto bg-white p-5 md:p-10 rounded-3xl shadow-xl">
        <img
          className="w-full max-h-96 object-cover rounded-t-xl"
          src={image}
          alt={title}
        />
        <h1 className="text-3xl md:text-4xl font-bold font-davidLibre mt-4">
          {title}
        </h1>
        <p>
          News Category:{" "}
          <span className="font-semibold capitalize">{category}</span>
        </p>
        <p className="my-1">
          Published Date: <span>{new Date(date).toLocaleDateString()}</span>
        </p>
        <p>
          Total View: <span className="font-semibold">{viewCount}</span>
        </p>
        <p className="my-2 text-justify">{description}</p>
        <p>Published By:</p>
        <p>Name: <span className="font-semibold">{publisher.name}</span></p>
        <p>Email: <span className="font-semibold">{publisher.email}</span></p>
      </div>
    </SectionContainer>
  );
};

export default ArticleDetails;
