import { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import useContextValue from "../../hooks/useContextValue";

const Navbar = () => {
  const { user } = useContextValue();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navLinks = (
    <>
      <NavLink onClick={() => setIsNavOpen(false)} to="/">
        Home
      </NavLink>
      <NavLink onClick={() => setIsNavOpen(false)} to="/all-articles">
        All Articles
      </NavLink>
      <NavLink onClick={() => setIsNavOpen(false)} to="/premium-articles">
        Premium Articles
      </NavLink>
      <NavLink onClick={() => setIsNavOpen(false)} to="/subscriptions">
        Subscription
      </NavLink>
      <NavLink onClick={() => setIsNavOpen(false)} to="/add-articles">
        Add Articles
      </NavLink>
      <NavLink onClick={() => setIsNavOpen(false)} to="/my-articles">
        My Articles
      </NavLink>
      <NavLink onClick={() => setIsNavOpen(false)} to="/dashboard">
        Dashboard
      </NavLink>
    </>
  );

  return (
    <nav className="flex items-center justify-between">
      <div className="text-lg md:hidden">
        <button onClick={() => setIsNavOpen(true)}>
          <HiMenuAlt1 />
        </button>
      </div>
      <div className="navbar_links hidden md:flex gap-x-2 lg:gap-x-4 font-semibold">
        {navLinks}
      </div>

      <div>
        {user ? (
          <>
            <button className="btn btn-sm btn-ghost mr-2">Logout</button>
            <NavLink to="/my-profile">Profile</NavLink>
          </>
        ) : (
          <Link to="/login">
            <button className="btn bg-[#ff1493] hover:bg-[#f70084] text-white">
              Login
            </button>
          </Link>
        )}
      </div>

      {/* Mobile navbar */}
      <div
        className={`absolute top-0 transition-all duration-300 ${
          isNavOpen ? "left-0" : "-left-[110%]"
        } w-full h-screen py-10 px-5 bg-[#FDF1D3]`}
      >
        <div className="relative">
          <button
            onClick={() => setIsNavOpen(false)}
            className="absolute right-0 top-0 btn btn-xs btn-circle btn-neutral"
          >
            <IoClose />
          </button>
        </div>
        <div>
          <p className="text-3xl font-girassol">Pixel News Everyday</p>
          <p className="text-xs uppercase">
            We providing this service since 2005
          </p>
        </div>
        <div className="navbar_links flex flex-col gap-y-1 font-semibold mt-5">
          {navLinks}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
