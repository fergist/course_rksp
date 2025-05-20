import React, { useState, useEffect } from 'react';
import AudioPlayer from '../components/AudioPlayer';
import Header from '../components/Header';
import axios from '../api/axios';
import './Home.css';

const Home = () => {
  // Список доступных песен (здесь используются статические данные)


  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    // Загрузка списка песен с сервера
    axios.get('/api/tracks')
      .then(response => setSongs(response.data))
      .catch(error => console.error('Ошибка при загрузке песен:', error));
  }, []);
  const addToFavorites = (trackId) => {
  axios.post('/api/favorites', { track_id: trackId })
    .then(() => alert('Трек добавлен в избранное'))
    .catch(error => console.error('Ошибка при добавлении в избранное:', error));
};

  return (
    <div>
      <Header />
      <h2>Главная страница</h2>
      <p>Добро пожаловать в сервис потоковой передачи аудио.</p>

      <h3>Список песен</h3>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.title}{' '}
            <button onClick={() => addToFavorites(song.id)}>
            ❤️
            </button>

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

export default Home;
