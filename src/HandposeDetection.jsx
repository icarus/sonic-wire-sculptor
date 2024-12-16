import { useEffect, useRef } from "react";
import * as handpose from "@tensorflow-models/handpose";
import { drawHand } from "./lib/fingers";
import { initializeAudio } from "./sound";

// Simple lookup indices for each finger
const fingerIndices = {
  thumb: [4, 3, 2, 1],
  index: [8, 7, 6, 5],
  middle: [12, 11, 10, 9],
  ring: [16, 15, 14, 13],
  pinky: [20, 19, 18, 17]
};

const HandposeDetection = ({ webcamRef, canvasRef, setFingersState }) => {
  const prevFingersState = useRef({
    thumb: false,
    index: false,
    middle: false,
    ring: false,
    pinky: false,
  });

  const lastStateChangeTime = useRef(Date.now());

  const isFingerExtended = (landmarks, fingerPoints, fingerName) => {
    // Special case for thumb
    if (fingerName === 'thumb') {
      const thumbTip = landmarks[fingerPoints[0]];    // Thumb tip (4)
      const thumbIp = landmarks[fingerPoints[1]];     // Thumb IP (3)
      const thumbMcp = landmarks[fingerPoints[2]];    // Thumb MCP (2)
      const indexMcp = landmarks[5];                  // Index finger MCP

      // For thumb to be considered "up":
      // 1. Thumb tip should be to the left/right of the index MCP (depending on hand)
      // 2. Thumb should be higher than its base
      const horizontalOffset = Math.abs(thumbTip[0] - indexMcp[0]);
      const isThumbOut = horizontalOffset > 60;
      const isThumbUp = thumbMcp[1] - thumbTip[1] > 20;

      return isThumbOut && isThumbUp;
    }

    // For other fingers
    const tipY = landmarks[fingerPoints[0]][1];  // Y of fingertip
    const midY = landmarks[fingerPoints[1]][1];  // Y of middle joint
    const baseY = landmarks[fingerPoints[3]][1]; // Y of base

    return (baseY - tipY) > 50 && // Tip is higher than base
           (baseY - midY) > 25 && // Middle is higher than base
           tipY < midY;           // Tip is higher than middle
  };

  const updateFingersState = (hands) => {
    const currentTime = Date.now();
    const newState = {
      thumb: false,
      index: false,
      middle: false,
      ring: false,
      pinky: false,
    };

    if (hands.length > 0) {
      const hand = hands[0];

      // Use handInViewConfidence instead of score
      if (hand.handInViewConfidence >= 0.99) {
        const landmarks = hand.landmarks;

        // Check each finger
        Object.entries(fingerIndices).forEach(([finger, points]) => {
          newState[finger] = isFingerExtended(landmarks, points, finger);
        });
      }
    }

    // Only update if it's been 2 seconds since last change
    if (JSON.stringify(newState) !== JSON.stringify(prevFingersState.current) &&
        currentTime - lastStateChangeTime.current >= 2000) {
      setFingersState(newState);
      prevFingersState.current = newState;
      lastStateChangeTime.current = currentTime;
    }
  };

  const runHandpose = async () => {
    try {
      const net = await handpose.load();
      console.log('Handpose model loaded.');
      await initializeAudio();

      const detect = async () => {
        if (webcamRef.current?.video?.readyState === 4) {
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

      const intervalId = setInterval(detect, 100);
      return () => clearInterval(intervalId);
    } catch (error) {
      console.error('Error loading handpose model:', error);
    }
  };

  useEffect(() => {
    const cleanup = runHandpose();
    return () => {
      cleanup?.then(cleanupFn => cleanupFn?.());
    };
  }, []);

  return null;
};

export default HandposeDetection;
