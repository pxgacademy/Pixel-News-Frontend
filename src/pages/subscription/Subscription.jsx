import Lottie from "lottie-react";
import lottie from "../../assets/lottie/subscription.json";
import SectionContainer from "../../components/container/SectionContainer";

const Subscription = () => {
  return (
    <SectionContainer>
      <div>
        <div className="flex items-center justify-center">
          <Lottie animationData={lottie} />
        </div>
      </div>
    </SectionContainer>
  );
};

export default Subscription;
