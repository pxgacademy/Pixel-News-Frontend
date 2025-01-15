// import Lottie from "lottie-react";
// import lottie from "../../assets/lottie/subscription.json";

import banner from "../../assets/images/subscription-banner.jpg";
import mobileBanner from "../../assets/images/mobile_subscription_banner.jpg";
const Subscription = () => {
  return (
    <div className="relative max-w-screen-2xl mx-auto flex md:items-center justify-center md:justify-start">
      <div className="hidden md:block">
        <img className="w-full" src={banner} alt="" />
      </div>
      <div className="md:hidden">
        <img className="w-full" src={mobileBanner} alt="" />
      </div>
      <div className="absolute px-5 md:px-10 max-w-96 md:max-w-[450px] lg:max-w-[600px] pt-36 md:pt-0 text-center md:text-left">
        <h2 className="text-2xl lg:text-4xl font-bold font-davidLibre mb-2">
          Unlock Exclusive Insights with <br /> Pixel News Premium
        </h2>
        <p className="text-sm">
          Elevate your news experience with our Premium Subscription. Access
          exclusive articles, in-depth analysis, and ad-free browsing to stay
          informed and ahead of the curve.
        </p>
        <button className="bg-gradient-to-r from-[#00D7FF] to-[#E7ABFF] rounded-full mt-5 shadow-md px-3 md:px-10 py-1 md:py-3 text-white font-semibold md:font-bold md:text-xl uppercase active:scale-[98%] active:translate-y-[1px]">
          Get Subscription
        </button>
      </div>
    </div>
  );
};

export default Subscription;
