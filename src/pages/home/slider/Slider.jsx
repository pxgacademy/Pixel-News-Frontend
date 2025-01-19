import "./slider.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import TextSnippet from "../../../components/textSnippet/TextSnippet";
import { usePublicDataLoader } from "../../../hooks/useDataLoader";
import Loading from "../../../components/loading/Loading";
import { Link } from "react-router-dom";
import ViewCountBadge from "../../../components/badges/ViewCountBadge";

const Slider = () => {
  const [articles =[], isLoading] = usePublicDataLoader("/slider-articles");

  if (isLoading) return <Loading />;
  return (
    <div className="w-full">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
        stopOnHover={true}
        showThumbs={true}
        showStatus={false}
        thumbWidth={80}
        renderThumbs={() =>
          articles.map((article, i) => (
            <img
              key={i + 1}
              src={article.image}
              className="w-14 h-14 object-cover"
            />
          ))
        }
      >
        {articles.map((article, i) => (
          <div key={i + 1} className="relative flex items-center">
            <div className=" md:text-xl">
              <ViewCountBadge count={article.viewCount} />
            </div>
            <div className="w-full">
              <img
                className="w-full min-h-96 md:min-h-[500px] lg:min-h-[600px] max-h-[600px]"
                src={article.image}
                alt={article.title}
              />
            </div>
            <div className="absolute max-w-96 md:max-w-lg m-5 md:m-0 md:ml-10 lg:ml-20 bg-white p-5 rounded-lg shadow-lg text-left">
              <p className="text-sm md:text-lg font-semibold mb-2">
                <span>{new Date(article.date).toLocaleDateString()} by</span>{" "}
                <span className="text-info">{article?.publisher?.name}</span>
              </p>
              <h3 className="text-lg md:text-3xl font-davidLibre font-semibold">
                {article.title}
              </h3>
              <div className="border-b border-info my-4 max-w-40" />
              <p className="mb-5 text-sm md:text-base">
                <TextSnippet text={article.description} length={200} />
              </p>

              <Link to={`/articles/details/${article._id}`}>
                <button className="btn btn-sm md:btn-md btn-info px-5 md:px-8 text-white">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
