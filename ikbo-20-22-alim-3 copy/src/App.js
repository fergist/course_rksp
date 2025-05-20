import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import {AuthContext, AuthProvider} from './components/AuthContext'; // путь подстрой под себя


import Home from './pages/Home';
import Library from './pages/Library';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Login from './pages/Login';


function App() {
  return (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};
export default App;

