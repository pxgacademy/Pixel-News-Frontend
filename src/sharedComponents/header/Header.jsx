import "./header.css";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className={`sticky top-0 z-50 w-full max-w-screen-2xl mx-auto`}>
      <section className="w-full max-w-screen-2xl px-5 lg:px-10 backdrop-blur bg-[#FDF1D3]/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100">
        <div className="w-full max-w-[1420px] mx-auto py-4">
          {/* navbar */}
          <Navbar />
        </div>
      </section>
    </header>
  );
};

export default Header;
