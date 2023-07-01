//chatgpt
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);
  const [authenticatedUsername, setAuthenticatedUsername] = useState(localStorage.getItem('authenticatedUsername') || null);
  const [authenticatedUserId, setAuthenticatedUserId] = useState(localStorage.getItem('authenticatedUserId') || null);
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token])
  useEffect(() => {
    localStorage.setItem('authenticatedUsername', authenticatedUsername);
  }, [authenticatedUsername])
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn])
  useEffect(() => {
    localStorage.setItem('authenticatedUserId', authenticatedUserId);
  }, [authenticatedUserId])
  function logout(){
    setToken(null);
    setAuthenticatedUsername(null);
    setIsLoggedIn(false);
    setAuthenticatedUserId(null);

  }
  return (
    <AuthContext.Provider value={{ token, setToken, logout,isLoggedIn, setIsLoggedIn, authenticatedUsername, setAuthenticatedUsername , authenticatedUserId, setAuthenticatedUserId}}>
      {children}
    </AuthContext.Provider>
  );
};
