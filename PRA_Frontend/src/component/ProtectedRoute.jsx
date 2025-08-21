import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoute({ children, allowedTypes }) {
  const token = Cookies.get("token"); // cookie मधून token घेतो
  const userType = Cookies.get("type"); // cookie मधून user type घेतो
  console.log(token)
  console.log(userType);
  // जर token नाही तर login page ला
  if (!token) {
    return <Navigate to="/login" />;
  }

  // जर user type allowed नाही तर unauthorized page ला
  if (allowedTypes && !allowedTypes.includes(userType)) {
    return <Navigate to="/login" replace />;
  }

  // बाकी सर्व बरोबर असल्यास component render कर
  return children;
}

export default ProtectedRoute;
