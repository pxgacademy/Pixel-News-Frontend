import Lottie from "lottie-react";
import lottie from "../../assets/lottie/premium.json";

const PremiumBadge = () => {
  return (
    <div className="absolute left-3 top-3 w-12 h-12 overflow-hidden rounded-full shadow-xl">
      <Lottie animationData={lottie} />
    </div>
  );
};

export default PremiumBadge;
