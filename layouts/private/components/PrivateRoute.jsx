import { Navigate, Outlet } from 'react-router-dom';
import { useStoreContext } from '../../../contextApi/ContextApi';

const PrivateRoute = ({ children }) => {
  const { token,id  } = useStoreContext();
  const isAuthenticated = token&&id;

  return isAuthenticated ? <Navigate to="/admindashboard" replace /> : children || <Outlet />;
};

export default PrivateRoute;