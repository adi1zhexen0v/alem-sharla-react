import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../utils/routes";
import { TOURIST_VISAS_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { useAuth } from "../hooks/useAuth";

const AppRouter: React.FC = () => {
  const { isAuth } = useAuth();
  const routesToRender = isAuth ? privateRoutes : publicRoutes;

  return (
    <Routes>
      {routesToRender.map((route, index) => (
        <Route key={index} path={route.path} element={<route.element />} />
      ))}
      <Route
        path="*"
        element={<Navigate to={isAuth ? TOURIST_VISAS_ROUTE : LOGIN_ROUTE} />}
      />
    </Routes>
  );
};

export default AppRouter;
