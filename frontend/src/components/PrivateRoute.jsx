// frontend/src/components/PrivateRoute.jsx

import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('userToken');
  return isAuthenticated ? children : <Navigate to="/login" />;
}
