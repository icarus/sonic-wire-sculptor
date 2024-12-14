import { useEffect, useRef } from "react";
import * as handpose from "@tensorflow-models/handpose";
import { drawHand } from "./lib/fingers";

const HandposeDetection = ({ webcamRef, canvasRef, setFingersState, playSound }) => {
  const prevFingersState = useRef({
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

  const FINGER_THRESHOLD = 30;

  const isFingerOpen = (joint1, joint2) => {
    const distance = Math.sqrt(
      Math.pow(joint1[0] - joint2[0], 2) + Math.pow(joint1[1] - joint2[1], 2)
    );
    return distance > FINGER_THRESHOLD;
  };

  const areStatesEqual = (state1, state2) => {
    return JSON.stringify(state1) === JSON.stringify(state2);
  };

  const updateFingersState = (hands) => {
    const newState = {
      leftHand: { ...prevFingersState.current.leftHand },
      rightHand: { ...prevFingersState.current.rightHand }
    };

    hands.forEach(hand => {
      const landmarks = hand.landmarks;
      // Determine if it's the right or left hand based on thumb position
      const isRightHand = landmarks[4][0] > landmarks[0][0];
      const handKey = isRightHand ? 'rightHand' : 'leftHand';

      const fingerState = {
        thumb: isFingerOpen(landmarks[4], landmarks[3]),
        index: isFingerOpen(landmarks[8], landmarks[7]),
        middle: isFingerOpen(landmarks[12], landmarks[11]),
        ring: isFingerOpen(landmarks[16], landmarks[15]),
        pinky: isFingerOpen(landmarks[20], landmarks[19])
      };

      // Update the state for the detected hand
      newState[handKey] = fingerState;

      // Play sounds for newly opened fingers
      Object.entries(fingerState).forEach(([finger, isOpen]) => {
        if (isOpen && !prevFingersState.current[handKey][finger]) {
          // Construct the full finger identifier (e.g., "leftHand_thumb")
          const fingerIdentifier = `${handKey}_${finger}`;
          playSound(fingerIdentifier);
        }
      });
    });

    // Update state only if there's a change
    if (!areStatesEqual(newState, prevFingersState.current)) {
      setFingersState(newState);
      prevFingersState.current = newState;
    }
  };

  useEffect(() => {
    const runHandpose = async () => {
      const net = await handpose.load();
      console.log("Handpose model loaded.");

      const detect = async () => {
        if (
          webcamRef.current &&
          webcamRef.current.video &&
          webcamRef.current.video.readyState === 4
        ) {
          const video = webcamRef.current.video;
          const hands = await net.estimateHands(video);

          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            drawHand(hands, ctx);
          }

          updateFingersState(hands);
        }
      };

      setInterval(detect, 100);
    };

    runHandpose();
  }, []);

  return null;
};

export default HandposeDetection;
