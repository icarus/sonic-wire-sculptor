import React, { useEffect } from "react";
import Webcam from "react-webcam";

const WebcamDisplay = ({ videoConstraints, webcamRef, canvasRef }) => {

  return (
    <div className="relative flex items-center justify-center overflow-hidden *:object-cover bg-neutral-200">
      <Webcam
        ref={webcamRef}
        videoConstraints={videoConstraints}
        screenshotFormat="image/jpeg"
        className="size-full aspect-video"
      />
      <canvas
        ref={canvasRef}
        videoConstraints={videoConstraints}
        className="absolute inset-0 size-full m-auto aspect-video"
      />
    </div>
  );
};

export default WebcamDisplay;
