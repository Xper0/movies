import { useAppSelector } from "hook/redux";
import { UserLogin } from "interfaces/User";
import { Navigate, Outlet } from "react-router-dom";

//public protaction
const ProtectedRouter = () => {
  const userInfo = useAppSelector((state: UserLogin) => state?.userLogin);

  return userInfo?.token ? <Outlet /> : <Navigate to={"/login"} />;
};

//admin router protaction
const AdminProtectedRouter = () => {
  const userInfo = useAppSelector((state: UserLogin) => state?.userLogin);
  return userInfo?.token ? (
    userInfo?.isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to={"/*"} />
    )
  ) : (
    <Navigate to={"/login"} />
  );
};
export { ProtectedRouter, AdminProtectedRouter };
