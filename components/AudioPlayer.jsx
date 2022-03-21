import React, { useState, useEffect, useRef } from "react";

import AudioControls from "./AudioControls";
import { Artist, StyleAudioPlayer, Title, TrackInfo } from "./AudioPlayerStyle";

const AudioPlayer = ({ tracks }) => {
  // State
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFirstTimeLoading, setIsFirstTimeLoading] = useState(true);

  // Destructure for conciseness
  const { title, artist, color, image, audioSrc } = tracks[trackIndex];

  // Refs
  // https://github.com/vercel/next.js/discussions/17963
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  // Destructure for conciseness
  console.log(audioRef)
  let { duration } = audioRef.current;

  const toPrevTrack = () => {
    console.log('prev')
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    console.log('next')
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  // The first is used to start or stop (pause) audio when the play or pause button is clicked.
  // The startTimer function is called as part of the useEffect hooks we added in the previous section. First, add it when the isPlaying state changes and is true.
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // The next useEffect hook will do some cleanup when the component unmounts. When unmounting, we want to make sure to pause the track and clear any setInterval timers that might be running. More on timers in the next section!
  useEffect(() => {

    if(isFirstTimeLoading){
      audioRef.current = new Audio(audioSrc);
      console.log(audioRef);
      setIsFirstTimeLoading(false);
    }


    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  // The final useEffect hook runs when the trackIndex state changes. It allows us to pause the currently playing track, update the value of the audioRef to a new source, reset the progress state, and set the new track to play.
  // Handle setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  // Start by defining a new function named startTimer within the AudioPlayer component. This function is responsible for starting a new setInterval timer when a track begins playing.
  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  // We have two more functions to add: onScrubEnd and onScrub. These functions run on these interactions: onkeyup, onChange and onMouseUp.
  const onScrub = (value) => {
	// Clear any timers already running
  clearInterval(intervalRef.current);
  audioRef.current.currentTime = value;
  setTrackProgress(audioRef.current.currentTime);
}

const onScrubEnd = () => {
  // If not already playing, start
  if (!isPlaying) {
    setIsPlaying(true);
  }
  startTimer();
}

const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
`;
  return (
    <StyleAudioPlayer>
      <div className="container">
        <TrackInfo>
          <img
            className="artwork"
            src={image}
            alt={`track artwork for ${title} by ${artist}`}
          />
          <Title>{title}</Title>
          <Artist>{artist}</Artist>
          <AudioControls
            isPlaying={isPlaying}
            onPrevClick={toPrevTrack}
            onNextClick={toNextTrack}
            onPlayPauseClick={setIsPlaying}
          />
          <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration ? duration : `${duration}`}
            className="progress"
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
