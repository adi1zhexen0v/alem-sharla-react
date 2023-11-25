import ApplicationsPage from '../pages/ApplicationsPage';
import ChatPage from '../pages/ChatPage';
import FeedbackPage from '../pages/FeedbackPage';
import GreenCardsPage from '../pages/GreenCardsPage';
import ImmigrationVisasPage from '../pages/ImmigrationVisasPage';
import LoginPage from '../pages/LoginPage';
import ProfilesPage from '../pages/ProfilesPage';
import { TOURIST_VISAS_ROUTE, CHAT_ROUTE, FEEDBACK_ROUTE, GREEN_CARDS_ROUTE, LOGIN_ROUTE, USERS_ROUTE, IMMIGRATION_VISAS_ROUTE } from './consts';

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    element: LoginPage
  }
];

export const privateRoutes = [
  {
    path: TOURIST_VISAS_ROUTE,
    element: ApplicationsPage
  },
  {
    path: CHAT_ROUTE,
    element: ChatPage
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
  },
  {
    path: IMMIGRATION_VISAS_ROUTE,
    element: ImmigrationVisasPage
  }
];
