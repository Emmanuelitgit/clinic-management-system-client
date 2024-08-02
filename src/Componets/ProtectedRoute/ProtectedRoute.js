import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({children}) => {

    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
      const getToken = async () => {
        try {
          const token = localStorage.getItem("token");
          setAuthenticated(token);
        } catch (error) {
          console.log(error);
        }
      };
      getToken();
    }, []);

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;