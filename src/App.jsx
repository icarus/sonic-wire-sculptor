import React, { useState, useEffect, useRef } from "react";
import WebcamDisplay from "./WebcamDisplay";
import * as tf from "@tensorflow/tfjs";
import CameraControls from "./CameraControls";
import HandposeDetection from "./HandposeDetection";
import { playSound } from './sound';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import SerialConnection from "./serialConnection";
import Timeline from "./Timeline";
import FingerPiano from "./FingerPiano";

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
  const [tempo, setTempo] = useState(20);
  const [steps, setSteps] = useState(4);

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

  const lineAnimationDuration = 60 / tempo;

  return (
    <div className="flex flex-col max-w-full h-svh">
      <div className="container flex flex-col items-start justify-between p-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="text-lg font-semibold">SWS</h2>
      </div>
      <ResizablePanelGroup direction="vertical" className="border-y border-neutral-800 h-full">
        <ResizablePanel defaultSize={90} className="border-r border-neutral-800">
          {/* Pass fingersState as a prop to Timeline */}
          <Timeline
            lineAnimationDuration={lineAnimationDuration}
            fingersState={fingersState}
            steps={steps}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={10}>
          <ResizablePanelGroup defaultSize={10} direction="horizontal" className="h-full">
            {/* <ResizablePanel defaultSize={10} className="p-4 flex flex-col gap-4 [&_h3]:font-semibold">
              <SerialConnection />
            </ResizablePanel> */}
            <ResizableHandle />
            <ResizablePanel defaultSize={90} className="border-t border-neutral-800 p-4 flex gap-4 [&_h3]:font-semibold">
              {/* <CameraControls
                devices={devices}
                cameraIndex={cameraIndex}
                setCameraIndex={setCameraIndex}
              /> */}
              <div>
                <label htmlFor="tempo">Tempo (BPM): </label>
                <input
                  id="tempo"
                  type="number"
                  value={tempo}
                  onChange={(e) => setTempo(Number(e.target.value))}
                  min="10"
                  max="300"
                  className="ml-2 w-24 border border-neutral-700 text-black rounded p-1"
                />
              </div>
              <div>
                <label htmlFor="tempo">Compases(?): </label>
                <input
                  id="steps"
                  type="range"
                  value={steps}
                  onChange={(e) => setSteps(Number(e.target.value))}
                  min="4"
                  max="8"
                  className="ml-2 w-24 border border-neutral-700 text-black rounded p-1"
                />
              </div>
              <div className="flex w-full h-full relative">
                <WebcamDisplay
                  webcamRef={webcamRef}
                  canvasRef={canvasRef}
                  videoConstraints={videoConstraints}
                />
                <HandposeDetection
                  webcamRef={webcamRef}
                  canvasRef={canvasRef}
                  setFingersState={setFingersState}
                  playSound={playSound}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;
