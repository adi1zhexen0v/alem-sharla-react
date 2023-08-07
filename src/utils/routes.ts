import ApplicationsPage from "../pages/ApplicationsPage";
import ChatPage from "../pages/ChatPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { APPLICATIONS_ROUTE, CHAT_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "./consts";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    element: LoginPage
  },
  {
    path: REGISTER_ROUTE,
    element: RegisterPage
  }
];

export const privateRoutes = [
  {
    path: CHAT_ROUTE,
    element: ChatPage
  },
  {
    path: APPLICATIONS_ROUTE,
    element: ApplicationsPage
  }
]