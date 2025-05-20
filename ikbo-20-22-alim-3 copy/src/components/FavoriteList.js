import React, { useState, useEffect } from 'react';
import AudioPlayer from '../components/AudioPlayer';
import axios from 'axios';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    // Загрузка списка избранных песен с сервера
    axios.get('/api/favorites')
      .then(response => setFavorites(response.data))
      .catch(error => console.error('Ошибка при загрузке избранных песен:', error));
  }, []);

  return (
    <div>
      <h2>Избранные песни</h2>
      <ul>
        {favorites.map((song) => (
          <li key={song.id}>
            {song.title}{' '}
            <button onClick={() => setSelectedSong(song)}>
              Проиграть
            </button>
          </li>
        ))}
      </ul>

      {selectedSong && (
        <div>
          <h4>Сейчас играет: {selectedSong.title}</h4>
          <AudioPlayer src={selectedSong.src} />
        </div>
      )}
    </div>
  );
};

export default Favorites;
