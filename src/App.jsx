import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utils";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [devices, setDevices] = useState([]);
  const [cameraIndex, setCameraIndex] = useState(0);

  // Load the handpose model
  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");

    // Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 100);
  };

  // Detect hands
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width and height
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width and height
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections
      const hand = await net.estimateHands(video);
      console.log(hand);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  // Get available video devices
  useEffect(() => {
    const getDevices = async () => {
      const deviceInfos = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = deviceInfos.filter((device) => device.kind === "videoinput");
      setDevices(videoDevices);
    };
    getDevices();
  }, []);

  // Handle arrow key press to change the camera
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowRight") {
        // Next camera
        setCameraIndex((prevIndex) => Math.min(devices.length - 1, prevIndex + 1));
      } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
        // Previous camera
        setCameraIndex((prevIndex) => Math.max(0, prevIndex - 1));
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [devices]);

  // Set up webcam with selected camera
  const videoConstraints = {
    deviceId: devices[cameraIndex]?.deviceId ? { exact: devices[cameraIndex].deviceId } : undefined,
  };

  // Start the handpose model
  useEffect(() => {
    if (devices.length > 0) {
      runHandpose();
    }
  }, [devices]);

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
      {devices.length > 0 && (
        <div>
          <p>Current Camera: {devices[cameraIndex]?.label || "Unknown"}</p>
          <p>Use Arrow Up/Right to switch to next camera, Arrow Down/Left to switch to previous camera</p>
        </div>
      )}
    </div>
  );
}

export default App;
