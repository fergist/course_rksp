
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>Audio Streaming Service</h1>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/library">Library</Link> |{' '}
        <Link to="/player">Player</Link>
      </nav>
    </header>
  );
};

export default Header;
