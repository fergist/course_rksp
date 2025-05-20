import React, { useState, useRef } from 'react';
import useSound from "use-sound";

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, duration, sound }] = useSound(src);
    const audio = audioRef.current;

  const togglePlay = () => {
    if (!audio) return;
    if (isPlaying) {
      pause();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  };
  

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={src} preload="metadata" />
      <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default AudioPlayer;


