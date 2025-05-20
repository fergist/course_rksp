// src/components/LoginForm.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const LoginForm = () => {
  const { setToken, setUserId } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append('username', email); // email отправляется как "username"
      params.append('password', password);

      const response = await axios.post('http://localhost:8000/api/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      setToken(response.data.access_token);

      // можно сделать редирект или перейти на другую страницу
    } catch (error) {
      console.error('Ошибка входа:', error.response?.data || error.message);
      alert('Неверный логин или пароль');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
