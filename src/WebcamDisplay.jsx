import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const WebcamDisplay = ({ videoConstraints, webcamRef, canvasRef }) => {
  const [videoDimensions, setVideoDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update video dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setVideoDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="*:object-cover relative flex items-center justify-center overflow-hidden bg-neutral-200 aspect-video">
      <Webcam
        ref={webcamRef}
        videoConstraints={videoConstraints}
        screenshotFormat="image/jpeg"
        className="size-full"
        audio={false}
        width={videoDimensions.width}
        height={videoDimensions.height}
      />
      <canvas
        ref={canvasRef}
        width={videoDimensions.width}
        height={videoDimensions.height}
        className="z-50 absolute inset-0 size-full m-auto"
      />
    </div>
  );
};

export default WebcamDisplay;
