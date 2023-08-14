import { useAuth } from './hooks/useAuth';
import { useUpdateUser } from './hooks/useUpdateUser';
import Sidebar from './components/Sidebar';
import AppRouter from './components/AppRouter';
import FullPageLoader from './components/FullPageLoader';
import './assets/scss/style.scss';

const App: React.FunctionComponent = () => {
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
