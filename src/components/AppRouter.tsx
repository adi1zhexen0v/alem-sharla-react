import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../utils/routes";
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/consts";

const AppRouter = () => {
  const userIsAuth = false;
  const routesToRender = userIsAuth ? privateRoutes : publicRoutes;

  return (
    <Routes>
      {routesToRender.map((route, index) => (
          <Route key={index} path={route.path} element={<route.element />} />
      ))}
      <Route path="*" element={<Navigate to={userIsAuth ? CHAT_ROUTE : LOGIN_ROUTE} />}/>
    </Routes>
  );
};

export default AppRouter;
