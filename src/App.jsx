import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utils";
import "./App.css";
import { playCalmSound } from "./sound";


function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [devices, setDevices] = useState([]);
  const [cameraIndex, setCameraIndex] = useState(0);
  const [fingersState, setFingersState] = useState({
    thumb: false,
    index: false,
    middle: false,
    ring: false,
    pinky: false,
  });


  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Load the handpose model
  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");

    // Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 200);
  };

  // Detect hands
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Check if dimensions are non-zero before proceeding
      if (videoWidth === 0 || videoHeight === 0) {
        console.error("Invalid video dimensions");
        return;
      }

      // Set video width and height
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width and height
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections
      const hand = await net.estimateHands(video);
      updateFingersState(hand);

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

      // Handle the case where no devices are found
      if (videoDevices.length === 0) {
        console.error("No video devices found.");
        return;
      }
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
  }, [devices, cameraIndex]);

  // Function to check the state of each finger
  const updateFingersState = (hands) => {
    if (hands.length > 0) {
      const hand = hands[0];
      const landmarks = hand.landmarks;

      const thumbState = isFingerOpen(landmarks[3], landmarks[2]);
      const indexState = isFingerOpen(landmarks[6], landmarks[5]);
      const middleState = isFingerOpen(landmarks[10], landmarks[9]);
      const ringState = isFingerOpen(landmarks[14], landmarks[13]);
      const pinkyState = isFingerOpen(landmarks[18], landmarks[17]);

      setFingersState({
        thumb: thumbState,
        index: indexState,
        middle: middleState,
        ring: ringState,
        pinky: pinkyState,
      });

      // Trigger sound or action based on open fingers
      playSound(thumbState, indexState, middleState, ringState, pinkyState);
    }
  };

  // Check if the finger is open based on joint distance
  const isFingerOpen = (joint1, joint2) => {
    const distance = Math.sqrt(
      Math.pow(joint1[0] - joint2[0], 2) + Math.pow(joint1[1] - joint2[1], 2)
    );
    return distance > 10; // Adjust distance threshold for your needs
  };

  let timeout;

  const playSound = (thumb, index, middle, ring, pinky) => {
    // Clear previous timeout to prevent multiple triggers in quick succession
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (thumb) {
        playCalmSound(20); // A note for thumb
      }
      if (index) {
        playCalmSound(140); // C# note for index
      }
      if (middle) {
        playCalmSound(270); // E note for middle
      }
      if (ring) {
        playCalmSound(500); // A note for ring
      }
      if (pinky) {
        playCalmSound(800); // B note for pinky
      }
    }, 150); // Delay time in milliseconds
  };

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
