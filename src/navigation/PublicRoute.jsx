import { Navigate } from 'react-router-dom';
import { useStoreContext } from '../contextApi/ContextApi';

const PublicRoute = ({ children }) => {
  const { token } = useStoreContext();

  return token ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;