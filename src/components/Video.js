import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import video from '../video.mp4'

export const Video = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    // player.on('waiting', () => {
    //   videojs.log('player is waiting');
    // });

    // player.on('dispose', () => {
    //   videojs.log('player will dispose');
    // });  
  };

  const videoJsOptions = {
    controls: true,
    fluid: true,
    responsive: true,
    userActions: {
        click: true
    },
    aspectRatio: "9:20",
    sources: [{
      src: video,
      type: 'video/mp4'
    }]
  };

  useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      const player = playerRef.current = videojs(videoElement, videoJsOptions, () => {
        videojs.log('player is ready');
        handlePlayerReady && handlePlayerReady(player);
      });

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      // const player = playerRef.current;

      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [handlePlayerReady, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className='video-js vjs-big-play-centered' />
    </div>
  );
}

export default Video;