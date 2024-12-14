import React, { useState } from "react";
import * as Tone from "tone";
import WaveformVisualizer from "./WaveformVisualizer";

const noteFreq = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
};

const PianoRoll = () => {
  const [audioData, setAudioData] = useState(null);

  const synth = new Tone.Synth().toDestination();

  const playNote = async (note) => {
    const recorder = new Tone.Recorder();

    synth.connect(recorder);
    recorder.start();

    synth.triggerAttackRelease(noteFreq[note], "4n");
    await Tone.Transport.start("+0.5");

    const recording = await recorder.stop();
    setAudioData(recording);
  };

  return (
    <div>
      <h1>Piano Roll</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
        {Object.keys(noteFreq).map((note) => (
          <button key={note} onClick={() => playNote(note)}>
            {note}
          </button>
        ))}
      </div>
      {audioData && <WaveformVisualizer audioData={audioData} />}
    </div>
  );
};

export default PianoRoll;
