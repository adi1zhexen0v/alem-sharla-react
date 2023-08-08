import { useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useAppDispatch } from './hooks/reduxHooks';
import Sidebar from './components/Sidebar';
import AppRouter from './components/AppRouter';
import { setUser } from './redux/slices/userSlice';
import './assets/scss/style.scss';

const App = () => {
  const { isAuth, loading, user } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const updateUser = async () => {
      if (user) {
        const token = await user.getIdToken();
        dispatch(
          setUser({
            name: user.displayName,
            email: user.email,
            id: user.uid,
            token,
          })
        );
      }
    };

    updateUser();
  }, [dispatch, user]);

  if (loading) {
    return (
      <h6>Loading</h6>
    )
  }

  return (
    <div className="app">
      { isAuth && <Sidebar/> }
      <AppRouter/>
    </div>
  );
}

export default App;
