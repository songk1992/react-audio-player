import React, { useEffect, useState } from "react";
import AudioPlayer from '../components/AudioPlayer';
import NoSsr from '../components/NoSsr';

export default function Home() {
  
  const tracks = [
    {
      title: 'SoundHelix-Song-1',
      artist: 'artist',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/DirkvdM_natural_spiral.jpg/800px-DirkvdM_natural_spiral.jpg',
      color: '#ccc',
    },
    {
      title: 'SoundHelix-Song-2',
      artist: 'artist',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
          image: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Lehn_Beautiful_Foldamer_HelvChimActa_1598_2003.jpg',
      color: '#ccc',
    },
    {
      title: 'SoundHelix-Song-3',
      artist: 'artist',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/DirkvdM_natural_spiral.jpg/800px-DirkvdM_natural_spiral.jpg',
      color: '#ccc',
    }
];

  return (

    <NoSsr>
      <AudioPlayer tracks={tracks}/>
    </NoSsr>
  )
}
