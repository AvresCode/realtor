import { useAuthStatus } from '../hooks/useAuthStatus';
import { Outlet, Navigate } from 'react-router';
import Spinner from './Spinner';

export default function PrivateRoute() {
  const { loading, loggedIn } = useAuthStatus();
  if (loading) {
    return <Spinner />;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
