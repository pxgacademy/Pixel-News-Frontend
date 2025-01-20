import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import newsImg1 from "../../../assets/logo/mews-plan-1.png";
import newsImg2 from "../../../assets/logo/mews-plan-2.png";
import newsImg3 from "../../../assets/logo/mews-plan-3.png";
import { IoClose } from "react-icons/io5";
import useContextValue from "../../../hooks/useContextValue";

const HomepageModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { homepageModalDone, setHomepageModalDone } = useContextValue();

  useEffect(() => {
    if (homepageModalDone) return;
    const timer = setTimeout(() => setIsModalOpen(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleModal = () => {
    setIsModalOpen(false)
    setHomepageModalDone(true);
  }

  return (
    <div>
      {isModalOpen && (
        <dialog open id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <div className="relative">
              <button
                onClick={handleModal}
                className="absolute -right-3 -top-3 btn btn-circle btn-sm btn-neutral"
              >
                <IoClose />
              </button>
            </div>
            <div className="rounded-lg bg-[url(../../assets/images/subscription-banner-homepage.jpg)] bg-no-repeat bg-center bg-cover text-center p-5 lg:p-10 text-white cursor-default">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-davidLibre">
                Choose Your Plan
              </h1>
              <p className="text-3xl font-semibold">
                unlock endless opportunities
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 mt-14">
                <div className="max-w-96 mx-auto bg-black/10 backdrop-blur p-5 text-white border border-white/20">
                  <img src={newsImg1} alt="" />
                  <p className="text-2xl font-semibold mb-4">Basic</p>
                  <p>
                    $
                    <span className="text-7xl font-semibold font-righteous">
                      02
                    </span>
                    /minute
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-4 text-left">
                    <span>+ Services</span>
                    <span>+ Add-Ons</span>
                    <span>+ Advantages</span>
                    <span>+ Bonuses</span>
                  </div>
                  <Link to="/subscriptions">
                    <button
                      onClick={handleModal}
                      className="btn w-full mt-5"
                    >
                      Buy Now
                    </button>
                  </Link>
                </div>

                <div className="max-w-96 mx-auto relative z-[2] md:scale-[105%] md:-translate-y-2 bg-black/10 backdrop-blur p-5 text-white border border-white">
                  <img src={newsImg2} alt="" />
                  <p className="text-2xl font-semibold mb-4 text-white">
                    Premium
                  </p>
                  <p>
                    $
                    <span className="text-7xl font-semibold font-righteous">
                      15
                    </span>
                    /5days
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-4 text-left">
                    <span>+ Services</span>
                    <span>+ Add-Ons</span>
                    <span>+ Advantages</span>
                    <span>+ Bonuses</span>
                  </div>
                  <Link to="/subscriptions">
                    <button
                      onClick={handleModal}
                      className="btn btn-info text-white w-full mt-5"
                    >
                      Buy Now
                    </button>
                  </Link>
                </div>

                <div className="max-w-96 mx-auto bg-black/10 backdrop-blur p-5 text-white border border-white/20">
                  <img src={newsImg3} alt="" />
                  <p className="text-2xl font-semibold mb-4">Platinum</p>
                  <p>
                    $
                    <span className="text-7xl font-semibold font-righteous">
                      25
                    </span>
                    /10days
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-4 text-left">
                    <span>+ Services</span>
                    <span>+ Add-Ons</span>
                    <span>+ Advantages</span>
                    <span>+ Bonuses</span>
                  </div>
                  <Link to="/subscriptions">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="btn w-full mt-5"
                    >
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default HomepageModal;
