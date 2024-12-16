import React, { useEffect, useState, useRef } from "react";
import { playSound } from "./sound";
import { Button } from "./components/ui/button";
import { presetPatterns, soundPresets } from './presets';
import { initializeAudio, setBPM, setCurrentPreset } from './sound';
import * as Tone from 'tone';
import { cn } from "./lib/utils";

export default function Timeline({
  fingersState,
  steps,
  bpm,
  setBpm,
  joystickX,
  joystickY,
  buttonState,
  autoPlay,
  showSlides,
  isMuted
}) {
  // State
  const [currentSound, setCurrentSound] = useState("Industrial");
  const [currentPattern, setCurrentPattern] = useState("Industrial");
  const [loopGrid, setLoopGrid] = useState(() => {
    return presetPatterns["Industrial"].pattern.map(row => [...row]);
  });
  const [activeColumn, setActiveColumn] = useState(0);
  const [progress, setProgress] = useState(0);

  // Refs
  const sequenceRef = useRef(null);
  const animationRef = useRef(null);

  // Load a preset pattern
  const loadPreset = (presetName) => {
    const preset = presetPatterns[presetName];
    if (!preset) return;

    setCurrentPattern(presetName);
    setLoopGrid(preset.pattern.map(row => [...row]));
    setBpm(preset.recommendedBPM);
    setBPM(preset.recommendedBPM);
    setCurrentSound(preset.soundPreset);
    setCurrentPreset(preset.soundPreset);
  };

  // Handle sound preset change
  const handleSoundChange = (preset) => {
    setCurrentSound(preset);
    setCurrentPreset(preset);
  };

  // Initialize audio sequence
  useEffect(() => {
    const setupAudio = async () => {
      await initializeAudio();

      if (sequenceRef.current) {
        sequenceRef.current.stop();
        sequenceRef.current.dispose();
      }

      const sequence = new Tone.Sequence(
        (time, col) => {
          if (!isMuted) {
            const fingerNames = ['thumb', 'index', 'middle', 'ring', 'pinky'];
            loopGrid.forEach((row, rowIndex) => {
              if (row[col]) {
                playSound(fingerNames[rowIndex]);
              }
            });
          }
        },
        [...Array(steps).keys()],
        "8n"
      );

      sequenceRef.current = sequence;
      sequence.start(0);

      if (autoPlay) {
        await Tone.start();
        Tone.Transport.start();
      }
    };

    setupAudio();

    return () => {
      if (sequenceRef.current) {
        sequenceRef.current.stop();
        sequenceRef.current.dispose();
      }
    };
  }, [steps, loopGrid, autoPlay, isMuted]);

  // Handle progress animation
  useEffect(() => {
    const totalDuration = (60 / bpm) * (steps / 2);
    let lastTime = null;

    const animate = (currentTime) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setProgress(prev => {
        let newProgress = prev + (deltaTime / totalDuration);
        if (newProgress >= 1) {
          newProgress = 0;
          lastTime = currentTime;
        }
        return newProgress;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [bpm, steps]);

  // Update active column based on progress
  useEffect(() => {
    setActiveColumn(Math.floor(progress * steps));
  }, [progress, steps]);

  // Update BPM in Tone.js
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  // Handle finger interactions
  useEffect(() => {
    Object.entries(fingersState).forEach(([finger, isActive]) => {
      if (isActive) {
        setLoopGrid(prevGrid => {
          const newGrid = prevGrid.map(row => [...row]);
          const rowIndex = ['thumb', 'index', 'middle', 'ring', 'pinky'].indexOf(finger);
          newGrid[rowIndex][activeColumn] = !newGrid[rowIndex][activeColumn];
          return newGrid;
        });
      }
    });
  }, [fingersState, activeColumn]);

  return (
    <div className="relative size-full flex flex-col overflow-clip bg-neutral-900/50 backdrop-blur-sm">
      {!showSlides && (
        <div className="absolute top-4 right-4 z-10 flex gap-4 items-center">
          <select
            className="bg-neutral-800 text-white rounded px-2 py-1"
            value={currentSound}
            onChange={(e) => handleSoundChange(e.target.value)}
          >
            {Object.keys(soundPresets).map((preset) => (
              <option key={preset} value={preset}>{preset}</option>
            ))}
          </select>

          <input
            type="number"
            value={bpm}
            onChange={(e) => {
              const newBPM = Math.min(200, Math.max(60, Number(e.target.value)));
              setBPM(newBPM);
              setBpm(newBPM);
            }}
            className="w-16 bg-neutral-800 text-white rounded px-2 py-1"
            min="60"
            max="200"
          />

          {Object.keys(presetPatterns).map((presetName) => (
            <Button
              key={presetName}
              onClick={() => loadPreset(presetName)}
              variant="secondary"
              className={cn(
                "bg-neutral-800 text-white rounded-md",
                currentPattern === presetName ? "!bg-white !text-black" : ""
              )}
            >
              {presetName}
            </Button>
          ))}

          <Button
            onClick={() => setLoopGrid(Array(5).fill().map(() => Array(steps).fill(false)))}
            className="!bg-white text-black rounded-md"
          >
            Clear
          </Button>
        </div>
      )}

      <div className="absolute inset-0 flex flex-col gap-0.5 justify-between w-full">
        {loopGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="relative w-full h-full flex gap-0.5">
            {row.map((isActive, colIndex) => (
              <div
                key={colIndex}
                className={`
                  relative size-full cursor-pointer rounded-sm transition-all
                  ${isActive ? "!bg-white" : "bg-neutral-800"}
                  ${activeColumn === colIndex ? "bg-white/25" : ""}
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

        <div
          className="absolute inset-y-0 w-px bg-red-500"
          style={{
            left: `${progress * 100}%`,
            transition: 'none'
          }}
        />
      </div>
    </div>
  );
}
