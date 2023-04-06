import { Navigate, Outlet } from 'react-router-dom';
import UserInfo from '../models/userInfo';

const isInOneOfRoles = (roles: ('user'|'admin')[]) => {
  const userInfo: UserInfo = JSON.parse(localStorage.getItem('userInfo') ?? '{}');
  return roles.some(role => role === userInfo.role);
};

const PrivateRoute = ({ roles }: { roles: ('user'|'admin')[]}) => {
  return isInOneOfRoles(roles) ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;