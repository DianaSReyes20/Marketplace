import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { RootState } from '../../store/store';

interface PrivateRouteProps {
  allowedRoles?: string[]; // Ej: ['admin', 'seller']
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // 1. Si no hay token, redirigir a login
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Si se especificaron roles pero el usuario no tiene permiso
  if (allowedRoles && (!user?.role || !allowedRoles.includes(user.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Si todo está bien, renderizar la ruta solicitada
  return <Outlet />;
};

export default PrivateRoute;