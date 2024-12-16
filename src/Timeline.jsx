import React, { useEffect, useState, useRef } from "react";
import { playSound } from "./sound";
import WaveformVisualizer from "./WaveformVisualizer";
import { Button } from "./components/ui/button";
import { presetPatterns, soundPresets } from './presets';
import { initializeAudio, setBPM, setCurrentPreset } from './sound';
import * as Tone from 'tone';
import { cn } from "./lib/utils";

export default function Timeline({ fingersState, steps, bpm, setBpm, autoPlay, showSlides, isMuted }) {
  const [loopGrid, setLoopGrid] = useState(() => {
    return presetPatterns["Rave"].pattern.map(row => [...row]);
  });
  const [currentPreset, setCurrentPresetState] = useState("Industrial");
  const [activeColumn, setActiveColumn] = useState(0);
  const [lastFingerActivation, setLastFingerActivation] = useState({});
  const [progress, setProgress] = useState(0);
  const gridRef = useRef(null);
  const sequenceRef = useRef(null);
  const animationRef = useRef(null);

  // Initialize audio and sequence on mount
  useEffect(() => {
    let sequence;
    const setupAudio = async () => {
      try {
        await initializeAudio();
        // Set Drums preset as default
        setCurrentPreset("Industrial");
        console.log('Audio initialized successfully');

        // Stop previous sequence if it exists
        if (sequenceRef.current) {
          sequenceRef.current.stop();
          sequenceRef.current.dispose();
        }

        // Create a sequence that repeats
        sequence = new Tone.Sequence(
          (time, col) => {
            if (!isMuted) {
              const fingerNames = ['thumb', 'index', 'middle', 'ring', 'pinky'];

              // Play sounds for active cells in this column
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

        // Start transport if autoPlay is true
        if (autoPlay) {
          await Tone.start();
          Tone.Transport.start();
        }
      } catch (error) {
        console.error('Error setting up audio:', error);
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

  // Reference existing effects from Timeline.jsx
  useEffect(() => {
    let lastTime = null;
    const totalDuration = (60 / bpm) * (steps / 2);

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

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [bpm, steps]);

  // Update active column based on progress
  useEffect(() => {
    const column = Math.floor(progress * steps);
    setActiveColumn(column);
  }, [progress, steps]);

  // Update BPM
  useEffect(() => {
    Tone.getTransport().bpm.value = bpm;
  }, [bpm]);

  // Handle finger activation
  useEffect(() => {
    Object.entries(fingersState).forEach(([finger, isActive]) => {
      const now = Date.now();
      if (isActive) {
        if (!lastFingerActivation[finger] || (now - lastFingerActivation[finger]) > 300) {
          setLoopGrid(prevGrid => {
            const newGrid = prevGrid.map(row => [...row]);
            const rowIndex = ['thumb', 'index', 'middle', 'ring', 'pinky'].indexOf(finger);
            newGrid[rowIndex][activeColumn] = !newGrid[rowIndex][activeColumn];
            return newGrid;
          });
          setLastFingerActivation(prev => ({
            ...prev,
            [finger]: now
          }));
        }
      }
    });
  }, [fingersState, activeColumn]);

  // Add this effect to handle muting
  useEffect(() => {
    if (sequenceRef.current) {
      if (isMuted) {
        sequenceRef.current.mute = true;
      } else {
        sequenceRef.current.mute = false;
      }
    }
  }, [isMuted]);

  const clearGrid = () => {
    const emptyGrid = Array(5).fill().map(() => Array(steps).fill(false));
    setLoopGrid(emptyGrid);
  };

  const handlePresetChange = (preset) => {
    setCurrentPresetState(preset);
    setCurrentPreset(preset); // This calls the audio function
  };

  const loadPreset = (presetName) => {
    const preset = presetPatterns[presetName];
    if (!preset) return;

    setLoopGrid(preset.pattern.map(row => [...row]));

    // Only update BPM if it's different to avoid unnecessary rerenders
    if (preset.recommendedBPM !== bpm) {
      setBpm(preset.recommendedBPM);
      setBPM(preset.recommendedBPM); // Update Tone.js BPM
    }

    // Set the corresponding sound preset if specified
    if (preset.soundPreset) {
      handlePresetChange(preset.soundPreset);
    }
  };

  return (
    <div className="relative size-full flex flex-col overflow-clip bg-neutral-900/50 backdrop-blur-sm">
      {!showSlides && (
        <div className="absolute top-4 right-4 z-10 flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-white">Sound:</label>
            <select
              className="bg-neutral-800 text-white rounded px-2 py-1"
              value={currentPreset}
              onChange={(e) => handlePresetChange(e.target.value)}
            >
              {Object.keys(soundPresets).map((preset) => (
                <option key={preset} value={preset}>
                  {preset}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-white">BPM:</label>
            <input
              type="number"
              value={bpm}
              onChange={(e) => {
                const newBPM = Math.min(200, Math.max(60, Number(e.target.value) || 60));
                setBPM(newBPM);
                setBpm(newBPM);
              }}
              className="w-16 bg-neutral-800 text-white rounded px-2 py-1"
              min="60"
              max="200"
            />
          </div>

          <div className="flex gap-2">
            {Object.keys(presetPatterns).map((presetName) => (
              <Button
                key={presetName}
                onClick={() => loadPreset(presetName)}
                variant="secondary"
                className={cn(
                  "px-3 py-1.5 bg-neutral-800 text-white rounded-md text-sm hover:bg-neutral-700",
                  presetPatterns[presetName].soundPreset === currentPreset ? "!bg-white !text-black" : ""
                )}
              >
                {presetName}
              </Button>
            ))}
          </div>

          <Button
            onClick={clearGrid}
            className="px-3 py-1.5 !bg-white hover:opacity-80 text-black rounded-md text-sm"
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Grid */}
      <div ref={gridRef} className="absolute inset-0 flex flex-col gap-0.5 justify-between w-full">
        {loopGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="relative w-full h-full flex gap-0.5 justify-center items-center">
            {row.map((isActive, colIndex) => (
              <div
                key={colIndex}
                className={`
                  relative size-full cursor-pointer rounded-sm transition-all duration-150
                  ${isActive ? "!bg-white" : "bg-neutral-800"}
                  ${Math.floor(progress * steps) === colIndex ? "bg-white/25" : ""}
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
            left: `${progress * 100}%`,
            transition: 'none'
          }}
        />
      </div>

      {/* Waveform */}
      <div className="absolute inset-x-0 bottom-0 h-24 opacity-30">
        <WaveformVisualizer activeColumn={Math.floor(progress * steps)} loopGrid={loopGrid} />
      </div>
    </div>
  );
}
