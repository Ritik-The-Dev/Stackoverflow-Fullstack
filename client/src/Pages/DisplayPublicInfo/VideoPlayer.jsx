import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './displayPublic.css';

function VideoPlayer() {

  const { videoUrl } = useParams();

  const videoRef = useRef(null);
  let holdTimeout;

  const handleRightTap = (e) => {
    if (videoRef.current) {
      e.preventDefault();
      videoRef.current.currentTime += 10;
      if (videoRef.current) {
      if(videoRef.current.playbackRate === 2){
        videoRef.current.playbackRate = 1;
      }
    }}
  };

  const handleLeftTap = (e) => {
    if (videoRef.current) {
      e.preventDefault();
      videoRef.current.currentTime -= 5;
    }
  };

  const handleMiddle = (e) => {
    if (videoRef.current) {
      e.preventDefault();
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleRightHoldStart = () => {
    holdTimeout = setInterval(() => {
      if (videoRef.current) {
        videoRef.current.playbackRate = 2; 
      }
    }, 1000);
  };

  const handleRightHoldEnd = () => {
    clearInterval(holdTimeout);
    if (videoRef.current) {
      videoRef.current.playbackRate = 1; 
    }
  };

  const handleLeftHoldStart = () => {
    holdTimeout = setInterval(() => {
      if (videoRef.current) {
        videoRef.current.currentTime -= 0.05;  // Adjust rewind speed here
      }
    }, 10);
  };

  const handleLeftHoldEnd = () => {
    clearInterval(holdTimeout);
    if (videoRef.current) {
      videoRef.current.playbackRate = 1; 
    }
  };
 return (
    <div style={{position:"absolute",background:"black",zIndex:"20",left:"0",top:"0",height:"100vh",overflow:"hidden"}}>
      <div>
        <video
          ref={videoRef}
          className=" mainVideo"
          loop
          controls
          controlsList="nofullscreen"
        >
          <source src={videoUrl} />
        </video>
      </div>
      <div className="mainVideo1">
        <div
          className="mainVideo2"
          onDoubleClick={handleLeftTap}
          onMouseDown={handleLeftHoldStart}
          onMouseUp={handleLeftHoldEnd}
          onTouchStart={handleLeftHoldStart}
          onTouchEnd={handleLeftHoldEnd}
        ></div>

        <div
          className="mainVideo3"
          onDoubleClick={handleMiddle}
        ></div>

        <div
          className=" mainVideo4"
          onDoubleClick={handleRightTap}
          onMouseDown={handleRightHoldStart}
          onMouseUp={handleRightHoldEnd}
          onTouchStart={handleRightHoldStart}
          onTouchEnd={handleRightHoldEnd}
        ></div>
      </div>
    </div>
 );
}

export default VideoPlayer;