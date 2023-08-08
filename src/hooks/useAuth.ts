import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';

export const useAuth = () => {
  const [user, loading, error] = useAuthState(auth);

  return ({
    isAuth: !!user,
    user,
    loading, 
    error
  })
}