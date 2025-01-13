import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useContextValue from "../hooks/useContextValue";
import Loading from "../components/loading/Loading";

const PrivateRoutes = ({ children }) => {
  const { pathname } = useLocation();
  const { user, loading } = useContextValue();

  if (loading) return <Loading />;

  if (user) return children;
  else return <Navigate state={{ goTo: pathname }} to="/login" replace/>;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
