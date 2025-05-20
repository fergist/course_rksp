import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext({token: null,
  setToken: () => {},
  userId: null,
  setUserId: () => {}
});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Проверка наличия токена и получение данных пользователя
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => setUser(response.data))
        .catch(() => setUser(null));
    }
  }, []);

  const login = (email, password) => {
    return axios.post('/api/login', { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.access_token);
        setUser(response.data.user);
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
