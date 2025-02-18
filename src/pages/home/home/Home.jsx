import { Helmet } from "react-helmet";
import AllPublishers from "../allPublishers/AllPublishers";
import PlansSection from "../plans/PlansSection";
import Headlines from "../rightSideSection/headlines/Headlines";
import Slider from "../slider/Slider";
import Statistics from "../statistics/Statistics";
import TrendingArticles from "../trendingArticles/TrendingArticles";
import HomepageModal from "../homepageModal/HomepageModal";
import MostPopular from "../mostPopular/MostPopular";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Pixel News</title>
      </Helmet>
      <section className="bg-gray-50 dark:bg-[#1d3335] text-gray-800 dark:text-gray-100 max-w-screen-2xl mx-auto">
        <section className="w-full pb-5 ">
          <Slider />
        </section>



        <section className="px-5 lg:px-10">


        <section className="pt-16 w-full max-w-[1420px] mx-auto">
          <MostPopular />
        </section>

        <section className="pt-16 w-full max-w-[1420px] mx-auto grid grid-cols-1 lg:grid-cols-3 ">
          {/* Left side section */}
          <div className="lg:col-span-2">
            <TrendingArticles />
            <AllPublishers />
            <PlansSection />
          </div>

          {/* Right side section */}
          <div className="ml-5 pl-5 border-l border-darkFive">
            <Headlines />
          </div>
        </section>


        </section>


        
        <section className="w-full max-w-screen-2xl mx-auto py-16 text-gray-800">
          <Statistics />
        </section>
      </section>
      <HomepageModal />
    </>
  );
};

export default Home;
