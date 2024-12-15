import { useEffect, useRef } from "react";
import * as handpose from "@tensorflow-models/handpose";
import { drawHand } from "./lib/fingers";
import { initializeAudio } from "./sound";

const HandposeDetection = ({ webcamRef, canvasRef, setFingersState }) => {
  const prevFingersState = useRef({
    thumb: false,
    index: false,
    middle: false,
    ring: false,
    pinky: false,
  });

  const calculateAngle = (point1, point2, point3) => {
    const vector1 = [point1[0] - point2[0], point1[1] - point2[1]];
    const vector2 = [point3[0] - point2[0], point3[1] - point2[1]];

    const dot = vector1[0] * vector2[0] + vector1[1] * vector2[1];
    const mag1 = Math.sqrt(vector1[0] ** 2 + vector1[1] ** 2);
    const mag2 = Math.sqrt(vector2[0] ** 2 + vector2[1] ** 2);

    const angle = Math.acos(dot / (mag1 * mag2));
    return angle * (180 / Math.PI);
  };

  const isFingerOpen = (tipIndex, pipIndex, mcpIndex, landmarks) => {
    const angle = calculateAngle(
      landmarks[tipIndex],
      landmarks[pipIndex],
      landmarks[mcpIndex]
    );
    return angle > 160; // Finger is considered open if angle is greater than 160 degrees
  };

  const isThumbOpen = (landmarks) => {
    const angle = calculateAngle(
      landmarks[4], // THUMB_TIP
      landmarks[3], // THUMB_IP
      landmarks[2]  // THUMB_MCP
    );
    return angle > 150; // Thumb has different threshold
  };

  const areStatesEqual = (state1, state2) => {
    return JSON.stringify(state1) === JSON.stringify(state2);
  };

  const getOpenFingers = (landmarks) => {
    const fingerState = {
      thumb: isThumbOpen(landmarks),
      index: isFingerOpen(8, 6, 5, landmarks),    // INDEX_TIP, PIP, MCP
      middle: isFingerOpen(12, 10, 9, landmarks), // MIDDLE_TIP, PIP, MCP
      ring: isFingerOpen(16, 14, 13, landmarks),  // RING_TIP, PIP, MCP
      pinky: isFingerOpen(20, 18, 17, landmarks), // PINKY_TIP, PIP, MCP
    };

    return fingerState;
  };

  const updateFingersState = (hands) => {
    const newState = {
      thumb: false,
      index: false,
      middle: false,
      ring: false,
      pinky: false,
    };

    if (hands.length > 0) {
      // Only process the first detected hand
      const hand = hands[0];
      const landmarks = hand.landmarks;

      // Get the state of all fingers
      const fingerState = getOpenFingers(landmarks);
      Object.assign(newState, fingerState);

      // Only update state if there's a change
      if (!areStatesEqual(newState, prevFingersState.current)) {
        setFingersState(newState);
        prevFingersState.current = newState;
      }
    } else {
      // Reset state when no hands are detected
      if (!areStatesEqual(newState, prevFingersState.current)) {
        setFingersState(newState);
        prevFingersState.current = newState;
      }
    }
  };

  useEffect(() => {
    const runHandpose = async () => {
      try {
        const net = await handpose.load();
        console.log("Handpose model loaded.");

        await initializeAudio();
        console.log("Audio initialized.");

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
              ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
              drawHand(hands, ctx);
            }

            updateFingersState(hands);
          }
        };

        setInterval(detect, 100);
      } catch (error) {
        console.error("Error in handpose detection:", error);
      }
    };

    runHandpose();
  }, [canvasRef, updateFingersState, webcamRef]);

  return null;
};

export default HandposeDetection;
