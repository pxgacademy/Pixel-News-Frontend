import "./header.css";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full max-w-screen-2xl mx-auto">
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
