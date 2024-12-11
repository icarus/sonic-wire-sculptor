import React, { useEffect } from "react";
import { Button } from "./components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

  // Handlers for the buttons
  const handleNextCamera = () => {
    setCameraIndex((prevIndex) => Math.min(devices.length - 1, prevIndex + 1));
  };

  const handlePreviousCamera = () => {
    setCameraIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  return (
    <>
      <h3 className="line-clamp-1">TÚ CÁMARA: {devices[cameraIndex]?.label || "Unknown"}</h3>
      <p>
        Cambia la cámara con las flechas para izquierda o derecha.
      </p>
      <div className="flex">
        <Button
          disabled={cameraIndex === 0}
          onClick={handlePreviousCamera}
        >
          <ArrowLeft />
        </Button>
        <Button
          disabled={cameraIndex === devices.length - 1}
          onClick={handleNextCamera}
        >
          <ArrowRight />
        </Button>
      </div>
    </>
  );
};

export default CameraControls;
