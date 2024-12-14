import React, { useEffect, useState, useRef } from "react";
import { playSound } from "./sound";
import WaveformVisualizer from "./WaveformVisualizer";
import { Button } from "./components/ui/button";
import { presetPatterns } from './presets';
import { Slider } from "./components/ui/slider";
import { initializeAudio, setBPM } from './sound';
import * as Tone from 'tone';

export default function Timeline({ fingersState, steps, bpm, setBpm }) {
  const [loopGrid, setLoopGrid] = useState(() =>
    Array(5).fill().map(() => Array(steps).fill(false))
  );
  const [activeColumn, setActiveColumn] = useState(0);
  const [lastFingerActivation, setLastFingerActivation] = useState({});
  const [swing, setSwing] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const gridRef = useRef(null);
  const sequenceRef = useRef(null);

  // Initialize audio and sequence on mount
  useEffect(() => {
    let sequence;
    const setupAudio = async () => {
      await initializeAudio();

      // Stop previous sequence if it exists
      if (sequenceRef.current) {
        sequenceRef.current.stop();
        sequenceRef.current.dispose();
      }

      // Create a sequence that repeats
      sequence = new Tone.Sequence(
        (time, col) => {
          setActiveColumn(col);
          const fingerNames = ['thumb', 'index', 'middle', 'ring', 'pinky'];

          // Play sounds for active cells in this column
          loopGrid.forEach((row, rowIndex) => {
            if (row[col]) {
              playSound(fingerNames[rowIndex]);
            }
          });
        },
        [...Array(steps).keys()],
        "8n"
      );

      sequenceRef.current = sequence;
      sequence.start(0);
      Tone.getTransport().start();
    };

    setupAudio();

    return () => {
      if (sequenceRef.current) {
        sequenceRef.current.stop();
        sequenceRef.current.dispose();
      }
    };
  }, [steps, loopGrid]);

  // Update BPM
  useEffect(() => {
    Tone.getTransport().bpm.value = bpm;
  }, [bpm]);

  // Handle finger activation
  useEffect(() => {
    const leftHand = fingersState.leftHand;
    const rightHand = fingersState.rightHand;

    const processHand = (hand, prefix) => {
      Object.entries(hand).forEach(([finger, isActive]) => {
        const now = Date.now();
        const fingerKey = `${prefix}_${finger}`;
        if (isActive) {
          if (!lastFingerActivation[fingerKey] || (now - lastFingerActivation[fingerKey]) > 500) {
            setLoopGrid(prevGrid => {
              const newGrid = prevGrid.map(row => [...row]);
              const rowIndex = Object.keys(hand).indexOf(finger);
              newGrid[rowIndex][activeColumn] = !newGrid[rowIndex][activeColumn];
              return newGrid;
            });
            setLastFingerActivation(prev => ({
              ...prev,
              [fingerKey]: now
            }));
          }
        }
      });
    };

    processHand(leftHand, 'leftHand');
    processHand(rightHand, 'rightHand');
  }, [fingersState, activeColumn]);

  // Clear grid
  const clearGrid = () => {
    const emptyGrid = Array(5).fill().map(() => Array(steps).fill(false));
    setLoopGrid(emptyGrid);
  };

  const loadPreset = (presetName) => {
    const preset = presetPatterns[presetName];
    setLoopGrid(preset.pattern.map(row => [...row]));
    setBpm(preset.recommendedBPM);
  };

  return (
    <div className="relative size-full flex flex-col overflow-clip bg-neutral-900/50 backdrop-blur-sm">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-white">BPM:</label>
          <input
            type="number"
            value={bpm}
            onChange={(e) => {
              const newBPM = Math.min(200, Math.max(60, Number(e.target.value)));
              setBPM(newBPM);
              setBpm(newBPM);
            }}
            className="w-16 bg-neutral-800 text-white rounded px-2 py-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-white">Swing:</label>
          <Slider
            value={[swing]}
            onValueChange={([value]) => {
              setSwing(value);
              const transport = Tone.getTransport();
              transport.swing = value;
              transport.swingSubdivision = "8n";
            }}
            max={1}
            step={0.1}
            className="w-24"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-white">Volume:</label>
          <Slider
            value={[volume]}
            onValueChange={([value]) => {
              setVolume(value);
              Tone.Destination.volume.value = Tone.gainToDb(value);
            }}
            max={1}
            step={0.1}
            className="w-24"
          />
        </div>

        {Object.keys(presetPatterns).map((presetName) => (
          <Button
            key={presetName}
            onClick={() => loadPreset(presetName)}
            className="px-3 py-1.5 bg-neutral-800 text-white rounded-md text-sm hover:bg-neutral-700"
          >
            {presetName}
          </Button>
        ))}

        <Button
          onClick={clearGrid}
          className="px-3 py-1.5 !bg-white hover:opacity-80 text-black rounded-md text-sm"
        >
          Clear All
        </Button>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="absolute inset-0 flex flex-col gap-0.5 justify-between w-full">
        {loopGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="relative w-full h-full flex gap-0.5 justify-center items-center">
            {row.map((isActive, colIndex) => (
              <div
                key={colIndex}
                className={`
                  relative size-full cursor-pointer rounded-sm transition-all duration-150
                  ${isActive ? "bg-white" : "bg-neutral-800"}
                  ${activeColumn === colIndex ? "bg-white/25" : ""}
                  hover:bg-opacity-80
                `}
                onClick={() => {
                  setLoopGrid(prevGrid => {
                    const newGrid = prevGrid.map(row => [...row]);
                    newGrid[rowIndex][colIndex] = !newGrid[rowIndex][colIndex];
                    return newGrid;
                  });
                }}
              />
            ))}
          </div>
        ))}

        {/* Red line */}
        <div
          className="absolute inset-y-0 w-px bg-red-500"
          style={{
            left: `${(activeColumn / steps) * 100}%`,
            transition: 'left 0.1s linear'
          }}
        />
      </div>

      {/* Waveform */}
      <div className="absolute inset-x-0 bottom-0 h-24 opacity-30">
        <WaveformVisualizer activeColumn={activeColumn} loopGrid={loopGrid} />
      </div>
    </div>
  );
}
