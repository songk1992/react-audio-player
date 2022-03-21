import React from 'react';
import { Next } from '../assets/Next';
import { Pause } from '../assets/Pause';
import { Play } from '../assets/play';
import { Prev } from '../assets/Prev';
import { AudioControlsStyle } from './AudioControlsStyle';

const AudioControls = ({ isPlaying, onPlayPauseClick, onPrevClick, onNextClick }) => (
  <AudioControlsStyle>
    <button type='button' className='prev' aria-label='Previous' onClick={() => onPrevClick()}>
      <Prev />
    </button>
    {isPlaying ? (
      <button type='button' className='pause' onClick={() => onPlayPauseClick(false)} aria-label='Pause'>
      <Pause />
      </button>
    ) : (
      <button type='button' className='play' onClick={() => onPlayPauseClick(true)} aria-label='Play'>
        <Play />
      </button>
    )}
    <button type='button' className='next' aria-label='Next' onClick={() => onNextClick()}>
      <Next />
    </button>
  </AudioControlsStyle>
);

export default AudioControls;
