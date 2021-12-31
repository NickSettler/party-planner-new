import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userLoggedSelector } from "../../modules/user";
import { ProtectedRouteProps } from "./types/ProtectedRoute";

const ProtectedRoute = ({ children }: ProtectedRouteProps): JSX.Element => {
  const userLogged = useSelector(userLoggedSelector);

  return userLogged ? children : <Navigate to={"/signin"} />;
};

export default ProtectedRoute;
