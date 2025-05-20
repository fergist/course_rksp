// src/components/TrackList.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import {AudioPlayer} from './AudioPlayer'

const TrackList = () => {
  const { token } = useContext(AuthContext);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await axios.get('/tracks');
        setTracks(response.data);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };
    fetchTracks();
  }, []);

  const addToFavorites = async (trackId) => {
    try {
      await axios.post(
        `/favorites/${trackId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Track added to favorites');
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <div>
      <h2>Available Tracks</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            {track.title}
            <button onClick={() => addToFavorites(track.id)}>Add to Favorites</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;
