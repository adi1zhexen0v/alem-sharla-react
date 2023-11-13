import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "./hooks/reduxHooks";
import { useAuth } from "./hooks/useAuth";
import { useUpdateUser } from "./hooks/useUpdateUser";
import { toggleActiveProfile } from "./redux/slices/profilesSlice";
import { deleteSelectedCorrespondence } from "./redux/slices/chatSlice";
import Sidebar from "./components/Sidebar";
import AppRouter from "./components/AppRouter";
import FullPageLoader from "./components/FullPageLoader";
import "./assets/scss/style.scss";

const App: React.FC = () => {
  const location = useLocation().pathname;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(toggleActiveProfile(null));
    dispatch(deleteSelectedCorrespondence(null));
  }, [dispatch, location]);

  const { isAuth, loading, user } = useAuth();
  useUpdateUser(user);

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <div className="app">
      {isAuth && <Sidebar />}
      <AppRouter />
    </div>
  );
};

export default App;
