import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './authProvider';

const allowedRoutesForType1 = [
  '/createpersona', '/listaspersonas'];

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
      
    }

    // Obtén la ruta base quitando cualquier parámetro de la ruta
    const basePath = location.pathname.split('/')[1];

    if (user.idTipoPersona === 1 && !allowedRoutesForType1.includes(basePath)) {
      navigate('/access-denegado');
    }
  }, [user, navigate, location]);

  return children;
};
