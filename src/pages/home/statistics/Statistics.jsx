import { useState } from "react";
import Loading from "../../../components/loading/Loading";
import { usePublicDataLoader } from "../../../hooks/useDataLoader";
import ScrollTrigger from "react-scroll-trigger";
import CountUp from "react-countup";

const Statistics = () => {
  const [users, isLoading] = usePublicDataLoader("/users/counts");
  const [counterOn, setCounterOn] = useState(false);

  if (isLoading) return <Loading minHeight="" />;
  return (
    <div className="bg-[url(../../assets/images/Statistics-banner.png)] bg-no-repeat bg-left bg-cover py-10 mt-16">
      <h3 className="text-3xl font-semibold text-center mb-8">Statistics</h3>
      <ScrollTrigger
        onEnter={() => setCounterOn(true)}
        onExit={() => setCounterOn(false)}
      >
        <div className="flex justify-around text-center">
          <div className="hidden md:block text-6xl md:text-7xl font-bold">
            <p className="uppercase md:text-3xl">All users</p>
            {counterOn && (
              <CountUp
                separator=""
                duration={2}
                start={-1000}
                end={users.nonPremium + users.premium}
                delay={0}
              />
            )}
            <span className="text-4xl">+</span>
          </div>

          <div className="text-6xl md:text-7xl font-bold">
            <p className="uppercase text-base md:text-3xl">normal users</p>
            {counterOn && (
              <CountUp
                separator=""
                duration={2}
                start={-1000}
                end={users.nonPremium}
                delay={0}
              />
            )}
            <span className="text-4xl">+</span>
          </div>

          <div className="text-6xl md:text-7xl font-bold">
          <p className="uppercase text-base md:text-3xl">Premium Users</p>
            {counterOn && (
              <CountUp
                separator=""
                duration={2}
                start={-1000}
                end={users.premium}
                delay={0}
              />
            )}
            <span className="text-4xl">+</span>
          </div>
        </div>
      </ScrollTrigger>
    </div>
  );
};

export default Statistics;
