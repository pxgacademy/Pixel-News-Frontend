import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useContextValue from "../hooks/useContextValue";
import Loading from "../components/loading/Loading";

const PremiumRoutes = ({ children }) => {
  const { pathname } = useLocation();
  const { user, loading, userRole, signOutUser } = useContextValue();

  if (loading) return <Loading />;

  if (user && (userRole?.isAdmin || userRole.isPremium)) return children;
  else {
    signOutUser();
    return <Navigate state={{ goTo: pathname }} to="/login" replace />;
  }
};

PremiumRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PremiumRoutes;

//
