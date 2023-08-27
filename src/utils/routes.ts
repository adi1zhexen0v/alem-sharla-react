import ApplicationsPage from '../pages/ApplicationsPage';
import ChatPage from '../pages/ChatPage';
import FeedbackPage from '../pages/FeedbackPage';
import LoginPage from '../pages/LoginPage';
import { APPLICATIONS_ROUTE, CHAT_ROUTE, FEEDBACK_ROUTE, LOGIN_ROUTE } from './consts';

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    element: LoginPage,
  }
];

export const privateRoutes = [
  {
    path: CHAT_ROUTE,
    element: ChatPage,
  },
  {
    path: APPLICATIONS_ROUTE,
    element: ApplicationsPage,
  },
  {
    path: FEEDBACK_ROUTE,
    element: FeedbackPage
  }
];
