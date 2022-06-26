import { useLayoutEffect, useRef } from 'react';
import Plyr from 'plyr';
import Hls from 'hls.js';
import 'plyr/dist/plyr.css';

const PlyrComponent = ({playbackId}) => {
    const video = useRef();
    const playerInstance = useRef();

    useLayoutEffect(() => {
        const source = `https://lvpr.tv?v=${playbackId}`;
        // const source = `https://livepeercdn.com/asset/1d464iglk9i336dk/video`
        playerInstance.current = new Plyr(video.current);
        const hls = new Hls();
        hls.loadSource(source);
        hls.attachMedia(video.current);
        window.hls = hls;
        playerInstance.current.speed = 1
        video.current.addEventListener('ended',myHandler,false);
        function myHandler(e) {
            // What you want to do after the event
            console.log('done')
        }
        return () => {
            playerInstance.current.destroy();
        };
    }, []);

    return <div id="player" className="plyr__video-embed" autoPlay={true} preload="auto">
        <iframe src={`https://lvpr.tv?v=fde8ly4658bemvob`} type="video/mp4"></iframe>
    </div>;
};

export default PlyrComponent;
