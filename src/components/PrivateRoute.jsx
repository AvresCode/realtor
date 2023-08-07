import { useAuthStatus } from '../hooks/useAuthStatus';
import { Outlet, Navigate } from 'react-router';

export default function PrivateRoute() {
  const { loading, loggedIn } = useAuthStatus();
  if (loading) {
    return <h1> Loading ... </h1>;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
