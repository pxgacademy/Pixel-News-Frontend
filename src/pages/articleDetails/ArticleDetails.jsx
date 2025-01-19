import { Navigate, useParams } from "react-router-dom";
import { useSecureDataLoader } from "../../hooks/useDataLoader";
import Loading from "../../components/loading/Loading";
import SectionContainer from "../../components/container/SectionContainer";
import useContextValue from "../../hooks/useContextValue";
import PremiumBadge from "../../components/badges/PremiumBadge";
import { Helmet } from "react-helmet";

const ArticleDetails = () => {
  const { userRole, user, loading } = useContextValue();
  const { id } = useParams();
  const [article = {}, isLoading] = useSecureDataLoader(`/articles/${id}`);
  const {
    date,
    image,
    title,
    description,
    viewCount,
    publisher,
    isPaid,
    creator,
    userInfo,
  } = article || {};

  if (!loading && !isLoading && user?.email !== creator) {
    if (isPaid && !userRole?.isPremium)
      if (!userRole.isAdmin) return <Navigate to="/" replace />;
  }
  if (isLoading || loading) return <Loading />;
  return (
    <SectionContainer header="Article Details">
      <Helmet>
        <title>Article Details | Pixel News</title>
      </Helmet>
      <div
        className={`relative max-w-3xl mx-auto bg-white p-5 md:p-10 rounded-3xl shadow-xl ${
          isPaid && "border border-yellow-600"
        }`}
      >
        {isPaid && <PremiumBadge />}
        <img
          className="w-full max-h-96 object-cover rounded-t-xl"
          src={image}
          alt={title}
        />
        <div className=" mt-4 flex items-center gap-x-3 flex-wrap">
          <p className="my-1">
            Published Date:{" "}
            <span className="font-semibold">
              {new Date(date).toLocaleDateString()}
            </span>
          </p>
          <p>
            Total View: <span className="font-semibold">{viewCount}</span>
          </p>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-davidLibre mt-3">
          {title}
        </h1>

        <div className="md:flex">
          <div className="md:flex-1 mt-3 flex items-center gap-x-2">
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

          <div className="md:flex-1 mt-3 flex items-center gap-x-2">
            <img
              className="w-12 max-h-12 object-cover"
              src={userInfo?.image}
              alt=""
            />
            <div>
              <p className="font-semibold">{userInfo?.name}</p>
              <p className="font-semibold">{creator}</p>
            </div>
          </div>
        </div>
        <p className="my-2 text-justify">{description}</p>
      </div>
    </SectionContainer>
  );
};

export default ArticleDetails;
