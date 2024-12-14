import React, { useState, useRef } from "react";
import WebcamDisplay from "./WebcamDisplay";
import * from tf
import HandposeDetection from "./HandposeDetection";
import Timeline from "./Timeline";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [fingersState, setFingersState] = useState({
    leftHand: {
      thumb: false,
      index: false,
      middle: false,
      ring: false,
      pinky: false,
    },
    rightHand: {
      thumb: false,
      index: false,
      middle: false,
      ring: false,
      pinky: false,
    }
  });
  const [bpm, setBpm] = useState(120);
  const [steps, setSteps] = useState(8);

  return (
    <div className="flex flex-col max-w-full h-svh">
      <div className="flex-grow">
        <Timeline
          fingersState={fingersState}
          steps={steps}
          setBpm={setBpm}
          bpm={bpm}
        />
      </div>
      <div className="absolute bottom-0 right-0 h-32 border-t border-neutral-800">
        <div className="flex w-full h-full relative">
          <WebcamDisplay
            webcamRef={webcamRef}
            canvasRef={canvasRef}
          />
          <HandposeDetection
            webcamRef={webcamRef}
            canvasRef={canvasRef}
            setFingersState={setFingersState}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
