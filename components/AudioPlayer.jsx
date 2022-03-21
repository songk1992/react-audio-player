import React, { useState, useEffect, useRef, useCallback } from 'react';

import AudioControls from './AudioControls';
import { Artist, StyleAudioPlayer, Title, TrackInfo } from './AudioPlayerStyle';

const AudioPlayer = ({ tracks }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstTimeLoading, setIsFirstTimeLoading] = useState(true);

  const { title, artist, color, image, audioSrc } = tracks[trackIndex];

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  console.log(audioRef);
  let { duration } = audioRef.current;

  const toPrevTrack = () => {
    console.log('prev');
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = useCallback(() => {
    console.log('next');
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  }, [trackIndex, tracks.length]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying, startTimer]);

  useEffect(() => {
    if (isFirstTimeLoading) {
      audioRef.current = new Audio(audioSrc);
      console.log(audioRef);
      setIsFirstTimeLoading(false);
    }

    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, [audioSrc, isFirstTimeLoading]);

  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [audioSrc, startTimer, trackIndex]);

  const startTimer = useCallback(() => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  }, [toNextTrack]);

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
  const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
`;
  return (
    <StyleAudioPlayer>
      <div className='container'>
        <TrackInfo>
          <img className='artwork' src={image} alt={`track artwork for ${title} by ${artist}`} />
          <Title>{title}</Title>
          <Artist>{artist}</Artist>
          <AudioControls isPlaying={isPlaying} onPrevClick={toPrevTrack} onNextClick={toNextTrack} onPlayPauseClick={setIsPlaying} />
          <input
            type='range'
            value={trackProgress}
            step='1'
            min='0'
            max={duration ? duration : `${duration}`}
            className='progress'
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
            style={{ background: trackStyling }}
          />
        </TrackInfo>
      </div>
    </StyleAudioPlayer>
  );
};

export default AudioPlayer;
