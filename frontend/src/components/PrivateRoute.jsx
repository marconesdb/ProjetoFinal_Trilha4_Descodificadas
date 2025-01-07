// frontend/src/components/PrivateRoute.jsx
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('userToken');
  return isAuthenticated ? children : <Navigate to="/login" />;
}


// Validação de props
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

