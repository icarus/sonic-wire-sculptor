import React, { useState, useEffect, useRef } from "react";
import WebcamDisplay from "./WebcamDisplay";
import * as tf from "@tensorflow/tfjs";
import CameraControls from "./CameraControls";
import HandposeDetection from "./HandposeDetection";
import FingerState from "./FingerState";
import { playCalmSound } from './sound';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable"
import SerialConnection from "./serialConnection";

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
    <div className="flex flex-col max-w-full h-svh">
      <div className="container flex flex-col items-start justify-between p-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="text-lg font-semibold">SONIC WIRE SCULPTOR BY AMIT PITARU (RECREADO POR TAE SONG Y FELIPE MANDIOLA)</h2>
      </div>
      <ResizablePanelGroup direction="horizontal" className="border-y border-neutral-800 h-full">
        <ResizablePanel defaultSize={75} className="border-r border-neutral-800">
          <div className="flex h-4/5">
            <WebcamDisplay webcamRef={webcamRef} canvasRef={canvasRef} videoConstraints={videoConstraints} />
            <HandposeDetection
              webcamRef={webcamRef}
              canvasRef={canvasRef}
              setFingersState={setFingersState}
              playSound={playCalmSound}
            />
            <FingerState fingersState={fingersState} />
          </div>
          <div className="border-t border-neutral-800 flex-col flex py-8 justify-between items-start h-1/5 [&_hr]:h-px [&_hr]:w-full [&_hr]:bg-neutral-300">
            <hr />
            <hr />
            <hr />
            <hr />
            <hr />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={25}>
          <ResizablePanelGroup defaultSize={25} direction="vertical" className="h-full">
            <ResizablePanel defaultSize={10} className="p-4 flex flex-col gap-4 [&_h3]:font-semibold">
              <SerialConnection />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={90} className="border-t border-neutral-800 p-4 flex flex-col gap-4 [&_h3]:font-semibold">
              <CameraControls devices={devices} cameraIndex={cameraIndex} setCameraIndex={setCameraIndex} />
            </ResizablePanel>

          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;
