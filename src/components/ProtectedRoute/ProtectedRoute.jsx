import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from;

  if (anonymous && isLoggedIn) {
    console.log(from, "from");
    return <Navigate to={from} />;
  }
  if (!anonymous && !isLoggedIn) {
    console.log(location, "location");
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
