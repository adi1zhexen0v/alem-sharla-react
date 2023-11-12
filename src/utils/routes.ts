import ApplicationsPage from '../pages/ApplicationsPage';
import ChatPage from '../pages/ChatPage';
import FeedbackPage from '../pages/FeedbackPage';
import GreenCardsPage from '../pages/GreenCardsPage';
import LoginPage from '../pages/LoginPage';
import ProfilesPage from '../pages/ProfilesPage';
import { APPLICATIONS_ROUTE, CHAT_ROUTE, FEEDBACK_ROUTE, GREEN_CARDS_ROUTE, LOGIN_ROUTE, USERS_ROUTE } from './consts';

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    element: LoginPage
  }
];

export const privateRoutes = [
  {
    path: APPLICATIONS_ROUTE,
    element: ApplicationsPage
  },
  {
    path: FEEDBACK_ROUTE,
    element: FeedbackPage
  },
  {
    path: USERS_ROUTE,
    element: ProfilesPage
  },
  {
    path: GREEN_CARDS_ROUTE,
    element: GreenCardsPage
  }
];
