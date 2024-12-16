import { useEffect, useRef } from "react";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
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

  const fingerTimeouts = useRef({
    thumb: null,
    index: null,
    middle: null,
    ring: null,
    pinky: null,
  });

  const isFingerUp = (keypoints, fingerBase, fingerTip) => {
    if (!keypoints || !keypoints[fingerBase] || !keypoints[fingerTip]) return false;

    const basePoint = keypoints[fingerBase];
    const tipPoint = keypoints[fingerTip];

    // Check if finger is pointing up (y coordinate of tip is significantly less than base)
    const yDiff = basePoint.y - tipPoint.y;
    const xDiff = Math.abs(basePoint.x - tipPoint.x);

    // Finger is considered "up" if:
    // 1. The tip is higher than the base (yDiff > 0)
    // 2. The vertical difference is significant (> 30 pixels)
    // 3. The finger is relatively straight (xDiff is small compared to yDiff)
    return yDiff > 30 && yDiff > xDiff * 1.5;
  };

  const updateFingersState = (hands) => {
    if (hands && hands.length > 0) {
      const keypoints = hands[0].keypoints;
      const newState = { ...prevFingersState.current };

      // Finger keypoint pairs (base, tip)
      const fingerIndices = {
        thumb: [2, 4],    // thumb_mcp to thumb_tip
        index: [5, 8],    // index_mcp to index_tip
        middle: [9, 12],  // middle_mcp to middle_tip
        ring: [13, 16],   // ring_mcp to ring_tip
        pinky: [17, 20]   // pinky_mcp to pinky_tip
      };

      Object.entries(fingerIndices).forEach(([finger, [baseIndex, tipIndex]]) => {
        const isDetected = isFingerUp(keypoints, baseIndex, tipIndex);

        // Clear existing timeout
        if (fingerTimeouts.current[finger]) {
          clearTimeout(fingerTimeouts.current[finger]);
        }

        if (isDetected && !prevFingersState.current[finger]) {
          newState[finger] = true;

          // Auto-reset after 300ms
          fingerTimeouts.current[finger] = setTimeout(() => {
            setFingersState(prev => ({
              ...prev,
              [finger]: false
            }));
            prevFingersState.current[finger] = false;
          }, 300);
        }
      });

      if (JSON.stringify(newState) !== JSON.stringify(prevFingersState.current)) {
        setFingersState(newState);
        prevFingersState.current = newState;
      }
    }
  };

  const runHandpose = async () => {
    try {
      const model = handPoseDetection.SupportedModels.MediaPipeHands;
      const detectorConfig = {
        runtime: 'tfjs',
        modelType: 'full',
        maxHands: 1,
        scoreThreshold: 0.8
      };

      const detector = await handPoseDetection.createDetector(model, detectorConfig);
      console.log('Hand pose detector loaded.');
      await initializeAudio();

      const detect = async () => {
        if (webcamRef.current?.video?.readyState === 4) {
          const video = webcamRef.current.video;
          const hands = await detector.estimateHands(video);

          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            drawHand(hands, ctx); // You might need to adjust the drawHand function
          }

          updateFingersState(hands);
        }
      };

      const intervalId = setInterval(detect, 100);
      return () => clearInterval(intervalId);
    } catch (error) {
      console.error('Error loading hand pose detector:', error);
    }
  };

  useEffect(() => {
    const cleanup = runHandpose();
    return () => {
      cleanup?.then(cleanupFn => cleanupFn?.());
      Object.values(fingerTimeouts.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  return null;
};

export default HandposeDetection;
