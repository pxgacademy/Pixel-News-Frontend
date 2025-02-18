import { NavLink, Outlet } from "react-router-dom";
import "./dashboard.css";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import useSignoutUser from "../../hooks/useSignoutUser";
import useContextValue from "../../hooks/useContextValue";
import ThemeModeBtn from "../../components/themeModeBtn/ThemeModeBtn";

const Dashboard = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [signOut] = useSignoutUser();
  const { isDark } = useContextValue();
  
  return (
    <section className={`${isDark && "dark"} relative flex  w-full max-w-screen-2xl mx-auto min-h-screen`}>

      <aside
        className={`fixed lg:relative z-20 transition-all duration-200 ${
          isMenu ? "left-0 lg:left-0 lg:top-0" : "-left-80 lg:left-0 lg:top-0"
        } w-full max-w-72 p-5 bg-[#1c2852] dark:bg-[#212529] text-gray-100 border border-[#5f9ea0]/20 min-h-screen`}
      >
        <div className="mb-3 lg:hidden">
          <button
            onClick={() => setIsMenu(false)}
            className="text-darkTwo px-3 py-2 bg-darkFive rounded-md"
          >
            <FaArrowLeft />
          </button>
        </div>

        {/* Dashboard Links */}
        <div className="dashboardNavLinks flex flex-col gap-2">
          <NavLink to="/dashboard/admin">
            <button onClick={() => setIsMenu(false)}>Admin</button>
          </NavLink>
          <NavLink to="/dashboard/all-users">
            <button onClick={() => setIsMenu(false)}>All Users</button>
          </NavLink>
          <NavLink to="/dashboard/all-articles">
            <button onClick={() => setIsMenu(false)}>All Articles</button>
          </NavLink>
          <NavLink to="/dashboard/add-publisher">
            <button onClick={() => setIsMenu(false)}>Add Publisher</button>
          </NavLink>
        </div>

        <div className="divider" />

        {/* Main Layout Links */}
        <div className="dashboardNavLinks flex flex-col gap-2">
          <NavLink onClick={() => setIsMenu(false)} to="/">
            <button>Home</button>
          </NavLink>
          <NavLink onClick={() => setIsMenu(false)} to="/all-articles">
            <button>All Articles</button>
          </NavLink>
          <NavLink onClick={() => setIsMenu(false)} to="/premium-articles">
            <button>Premium Articles</button>
          </NavLink>
          <NavLink onClick={() => setIsMenu(false)} to="/subscriptions">
            <button>Subscription</button>
          </NavLink>
          <NavLink onClick={() => setIsMenu(false)} to="/add-articles">
            <button>Add Articles</button>
          </NavLink>
          <NavLink onClick={() => setIsMenu(false)} to="/my-articles">
            <button>My Articles</button>
          </NavLink>
        </div>

        <div className="dashboardNavLinks mt-5">
          <button onClick={signOut} className="flex items-center gap-x-2">
            <MdLogout className="rotate-180" /> Logout
          </button>
        </div>


        
      </aside>
      <section className="flex-1 relative min-h-screen bg-[#FDF1D3] dark:bg-[#1A1D21] text-gray-800 dark:text-gray-100 overflow-y-clip">
        <button
          onClick={() => setIsMenu(true)}
          className="fixed z-10 flex items-center justify-center w-10 h-10 lg:hidden top-3 left-3 p-2 rounded-md shadow-md bg-gray-200 dark:bg-gray-800 text-lg"
        >
          <FiMenu />
        </button>
        <div className="fixed lg:absolute z-10 w-10 h-10 flex items-center justify-center top-3 left-14 lg:left-auto lg:right-3 rounded-md bg-gray-200 dark:bg-gray-800 shadow-md">
          <ThemeModeBtn/>
        </div>

        <Outlet />
      </section>
    </section>
  );
};

export default Dashboard;
