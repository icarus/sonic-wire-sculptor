import React, { useState } from "react";
import FingerState from "./FingerState";
import WaveformVisualizer from "./WaveformVisualizer";
import { playSound } from "./sound";

const FingerPiano = ({ fingersState, setFingersState }) => {
  const [audioData, setAudioData] = useState(null);

  const handleFingerToggle = (finger) => {
    setFingersState((prevState) => ({
      ...prevState,
      [finger]: !prevState[finger],
    }));

    playSound(finger);
  };

  return (
    <div>
      <h1>Finger Piano</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
        {Object.keys(fingersState).map((finger) => (
          <button
            key={finger}
            onClick={() => handleFingerToggle(finger)}
            className={fingersState[finger] ? "bg-white text-black px-2" : "bg-white text-black px-2 opacity-30"}
          >
            {finger}
          </button>
        ))}
      </div>
      {audioData && <WaveformVisualizer audioData={audioData} />}
    </div>
  );
};

export default FingerPiano;
