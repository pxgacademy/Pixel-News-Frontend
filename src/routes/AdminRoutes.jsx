import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useContextValue from "../hooks/useContextValue";
import Loading from "../components/loading/Loading";

const AdminRoutes = ({ children }) => {
  const { pathname } = useLocation();
  const { user, loading, userRole } = useContextValue();

  if (loading) return <Loading />;

  if (user && userRole?.isAdmin) return children;
  else {
    // TODO:    signOutUser();
    return <Navigate state={{ goTo: pathname }} to="/login" replace />;
  }
};

AdminRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoutes;
