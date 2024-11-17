import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function MainLayout() {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  if (role === "admin") {
    return <Navigate to={"/admin/dashboard"} />;
  }

  if (role === "teacher") {
    return <Navigate to={"/teacher/dashboard"} />;
  }

  if (role === "student") {
    return <Navigate to={"/student/dashboard"} />;
  }

  return <Navigate to={"/"} />;
}

export default MainLayout;
