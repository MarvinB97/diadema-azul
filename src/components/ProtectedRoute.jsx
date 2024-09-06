import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/use-auth-store.js';

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
