import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default ProtectedLayout;
