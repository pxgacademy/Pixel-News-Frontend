import "./slider.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";



const Slider = () => {
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
      >
        <div>
         <p>Loading...1</p>
        </div>
        <div>
         <p>Loading...2</p>
        </div>
        <div>
         <p>Loading...3</p>
        </div>
        <div>
         <p>Loading...4</p>
        </div>
        <div>
         <p>Loading...5</p>
        </div>
        <div>
         <p>Loading...6</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Slider;
