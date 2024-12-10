import React, { useEffect } from "react";

const CameraControls = ({ devices, cameraIndex, setCameraIndex }) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowRight") {
        // Move to the next camera
        setCameraIndex((prevIndex) => Math.min(devices.length - 1, prevIndex + 1));
      } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        // Move to the previous camera
        setCameraIndex((prevIndex) => Math.max(0, prevIndex - 1));
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [devices, setCameraIndex]);

  return (
    <div>
      <p>Current Camera: {devices[cameraIndex]?.label || "Unknown"}</p>
      <p>
        Use Arrow Up/Right to switch to next camera, Arrow Down/Left to switch
        to previous camera
      </p>
    </div>
  );
};

export default CameraControls;
