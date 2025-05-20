import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Предполагается, что файлы страниц находятся в папке pages
import Home from '../pages/Home';
import Library from '../pages/Library';
import Player from '../pages/Player';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/player" element={<Player />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
