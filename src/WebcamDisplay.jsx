import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const WebcamDisplay = ({ videoConstraints, webcamRef, canvasRef }) => {
  const [videoDimensions, setVideoDimensions] = useState({
    width: 640,
    height: 480,
  });

  useEffect(() => {
    const handleResize = () => {
      if (webcamRef.current && webcamRef.current.video) {
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        setVideoDimensions({
          width: videoWidth,
          height: videoHeight,
        });
      }
    };

    handleResize();
    const video = webcamRef.current?.video;

    if (video) {
      video.addEventListener('loadeddata', handleResize);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (video) {
        video.removeEventListener('loadeddata', handleResize);
      }
    };
  }, [webcamRef]);

  return (
    <div className="relative flex items-center justify-center overflow-hidden bg-neutral-200 aspect-video">
      <Webcam
        ref={webcamRef}
        videoConstraints={videoConstraints}
        screenshotFormat="image/jpeg"
        className="size-full object-cover"
        audio={false}
        width={videoDimensions.width}
        height={videoDimensions.height}
      />
      <canvas
        ref={canvasRef}
        width={videoDimensions.width}
        height={videoDimensions.height}
        className="absolute inset-0 size-full z-50"
      />
    </div>
  );
};

export default WebcamDisplay;
