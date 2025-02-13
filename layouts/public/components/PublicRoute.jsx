import { Navigate, Outlet } from 'react-router-dom';
import { useStoreContext } from '../../../contextApi/ContextApi';

const PublicRoute = ({ children }) => {
  const { token ,id} = useStoreContext();
  const isAuthenticated = token&&id;

  return isAuthenticated ? <Navigate to="/" replace /> : children || <Outlet />;
};

export default PublicRoute;