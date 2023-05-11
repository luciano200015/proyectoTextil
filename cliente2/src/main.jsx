import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from './routes/AppRouter';
import { AuthProvider } from './context/authProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AuthProvider>
      <BrowserRouter>
         <AppRouter/>
      </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>
)
