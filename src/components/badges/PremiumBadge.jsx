import Lottie from "lottie-react";
import lottie from "../../assets/lottie/premium.json";

const PremiumBadge = () => {
  return (
    <div className="absolute left-3 top-3 w-12 h-12 rounded-full flex items-center justify-center">
      <div className='relative w-12 h-12 flex items-center justify-center'>
      <div className="absolute w-12 h-12 z-10 "><Lottie animationData={lottie} /></div>
      <div className="absolute w-6 h-6 bg-[#984AFF] animate-ping blur"></div>
      <div className="absolute w-6 h-6 bg-[#984AFF] animate-ping blur"></div>

      </div>
    </div>
  );
};

export default PremiumBadge;
