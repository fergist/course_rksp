// src/components/RegisterForm.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const RegisterForm = () => {
  const { setToken, setUserId } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
      username: username,
      email: email,
      password_hash: password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
      setToken(response.data.access_token);
      // Предполагается, что backend возвращает userId
      setUserId(response.data.user_id);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Nickname"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
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
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
