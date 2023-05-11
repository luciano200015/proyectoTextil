import React, { createContext, useState, useEffect, useContext } from 'react';
import Axios from "axios";


const AuthContext = createContext();
const useAuth = () => {
  const authContext = useContext(AuthContext);
  
  if (!authContext) new Error('El contexto de autenticación no está disponible. Asegúrate de que AuthProvider envuelva tu aplicación.');
  
  return authContext;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null); // new state for token

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedToken && storedUser) {
      // Aquí puedes realizar la validación del token en el servidor si es necesario
      setUser(storedUser);
      setIsLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

  const loginUser = (userData) => {
     Axios.post("http://localhost:3001/loginpersona", userData)
      .then((response) => {
        const { user: responseUser, token: responseToken } = response.data;
        if (responseUser && responseToken && responseUser.idTipoPersona!==2 && responseUser.idTipoPersona!==3) {

          setUser(responseUser);
          setToken(responseToken);
          localStorage.setItem('token', responseToken);
          localStorage.setItem('user', JSON.stringify(responseUser));
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  };

  const logoutUser = () => {
    setUser(null);
    setIsLoggedIn(false);
    setToken(null); // limpiar el estado del token
    localStorage.removeItem('token'); // eliminar el token del localStorage
    localStorage.removeItem('user'); // eliminar el token del localStorage
  };

  const registerUser = (userData) => {
    // Aquí puedes realizar la lógica de registro de usuarios
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn,
      token,
      loginUser,
      logoutUser,
      registerUser,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
