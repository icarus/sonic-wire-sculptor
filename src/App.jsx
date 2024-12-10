import React, { useState, useEffect, useRef } from "react";
import WebcamDisplay from "./WebcamDisplay";
import * as tf from "@tensorflow/tfjs";
import CameraControls from "./CameraControls";
import HandposeDetection from "./HandposeDetection";
import FingerState from "./FingerState";
import { playCalmSound } from './sound';


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

  const videoConstraints = {
    deviceId: devices[cameraIndex]?.deviceId ? { exact: devices[cameraIndex].deviceId } : undefined,
  };

  useEffect(() => {
    const getDevices = async () => {
      const deviceInfos = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = deviceInfos.filter((device) => device.kind === "videoinput");
      setDevices(videoDevices);

      if (videoDevices.length === 0) {
        console.error("No video devices found.");
      }
    };
    getDevices();
  }, []);

  return (
    <div className="webcam">
      <WebcamDisplay webcamRef={webcamRef} canvasRef={canvasRef} videoConstraints={videoConstraints} />
      <CameraControls devices={devices} cameraIndex={cameraIndex} setCameraIndex={setCameraIndex} />
      <HandposeDetection
        webcamRef={webcamRef}
        canvasRef={canvasRef}
        setFingersState={setFingersState}
        playSound={playCalmSound}
      />
      <FingerState fingersState={fingersState} />
    </div>
  );
}

export default App;
