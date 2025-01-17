import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import useContextValue from "../../hooks/useContextValue";

const NavbarLinks = ({ setIsNavOpen }) => {
  const { user, userRole } = useContextValue();

  return (
    <>
      <NavLink onClick={() => setIsNavOpen(false)} to="/">
        Home
      </NavLink>
      <NavLink onClick={() => setIsNavOpen(false)} to="/all-articles">
        All Articles
      </NavLink>
      {user && (
        <>
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
        </>
      )}
      {userRole.isAdmin && (
        <NavLink onClick={() => setIsNavOpen(false)} to="/dashboard/admin">
          Dashboard
        </NavLink>
      )}
    </>
  );
};

NavbarLinks.propTypes = {
  setIsNavOpen: PropTypes.func.isRequired,
};

export default NavbarLinks;
