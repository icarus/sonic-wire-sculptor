import React from "react";
import Webcam from "react-webcam";

const WebcamDisplay = ({ videoConstraints, webcamRef, canvasRef }) => {
  return (
    <div className="webcam">
      <Webcam
        ref={webcamRef}
        videoConstraints={videoConstraints}
        screenshotFormat="image/jpeg"
        width="100%"
        height="100%"
      />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default WebcamDisplay;
