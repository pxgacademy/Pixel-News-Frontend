import AllPublishers from "../allPublishers/AllPublishers";
import Slider from "../slider/Slider";

const Home = () => {
  return (
    <>
      <section className="w-full max-w-screen-2xl mx-auto pb-5 bg-[#FDF1D3]">
        <Slider />
      </section>

      <section className="w-full max-w-screen-2xl px-5 lg:px-10 mx-auto grid grid-cols-1 lg:grid-cols-3 bg-[#FDF1D3]">
        <div className="lg:col-span-2">
            <AllPublishers/>
        </div>
        <div>ajslkdjf</div>
      </section>
    </>
  );
};

export default Home;
