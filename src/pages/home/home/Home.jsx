import AllPublishers from "../allPublishers/AllPublishers";
import PlansSection from "../plans/PlansSection";
import Slider from "../slider/Slider";
import Statistics from "../statistics/Statistics";
import TrendingArticles from "../trendingArticles/TrendingArticles";

const Home = () => {
  return (
    <>
      <section className="w-full max-w-screen-2xl mx-auto pb-5 bg-[#FDF1D3]">
        <Slider />
      </section>

      <section className="w-full max-w-screen-2xl px-5 lg:px-10 mx-auto grid grid-cols-1 lg:grid-cols-3 bg-[#FDF1D3]">

        {/* Left side section */}
        <div className="lg:col-span-2">
          <TrendingArticles />
          <AllPublishers />
          <PlansSection/>
        </div>

        {/* Right side section */}
        <div>ajslkdjf</div>
      </section>
      <section className="w-full max-w-screen-2xl mx-auto py-16 bg-[#FDF1D3]">
          <Statistics />

      </section>
    </>
  );
};

export default Home;
