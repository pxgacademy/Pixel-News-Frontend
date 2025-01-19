import { Link } from "react-router-dom";
import "./header.css";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="relative w-full max-w-screen-2xl mx-auto">
      <section className="w-full font-inter py-3 px-5 bg-darkBlue text-white">
        <div className="max-w-7xl mx-auto">
          <div className="md:flex items-center justify-between">
            <div>
              <p className="text-4xl text-center md:text-left md:text-5xl font-girassol">
                Pixel News Everyday
              </p>
              <p className="text-center text-sm md:text-base uppercase">
                We providing this service since 2005
              </p>
            </div>
            <div>
              <Link to='/subscriptions'>
              <button className="hidden md:flex flex-col items-center border border-darkFour rounded-xl px-5 py-2 hover:bg-[#ff1493] transition-colors duration-200">
                <span className="text-xl md:text-2xl font-semibold uppercase">
                  Subscribe Now
                </span>
                <span className="font-davidLibre text-base md:text-lg">
                  Only $15 for 5 days
                </span>
              </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full max-w-screen-2xl px-5 bg-[#FDF1D3]">
        <div className="max-w-7xl mx-auto py-4">
          {/* navbar */}
          <Navbar />
        </div>
      </section>
    </header>
  );
};

export default Header;
