import { useEffect, useState } from "react";
import * as Tone from "tone";

const noteFreq = {
  thumb: 65.41, // C2
  index: 293.66, // D4
  middle: 329.63, // E4
  ring: 349.23, // F4
  pinky: 392.0, // G4
};

const loopingMachine = (fingersState, bpm, playSound) => {
  const [loops, setLoops] = useState({});

  useEffect(() => {
    const loopDuration = (60 / bpm) * 1000;

    const handleLoop = (finger, isActive) => {
      if (isActive && !loops[finger]) {
        const loop = new Tone.Loop((time) => {
          // Play the sound for the corresponding finger
          playSound(finger);
        }, loopDuration).start(0);

        setLoops((prevLoops) => ({
          ...prevLoops,
          [finger]: loop,
        }));
      } else if (!isActive && loops[finger]) {
        loops[finger].stop();
        setLoops((prevLoops) => {
          const newLoops = { ...prevLoops };
          delete newLoops[finger];
          return newLoops;
        });
      }
    };

    // Handle each finger and its looping state
    Object.keys(fingersState).forEach((finger) => {
      handleLoop(finger, fingersState[finger]);
    });

    return () => {
      // Cleanup all loops on component unmount
      Object.keys(loops).forEach((loopKey) => {
        loops[loopKey].stop();
      });
    };
  }, [fingersState, bpm, loops, playSound]);

  return null;
};

export default loopingMachine;
