import { useEffect, useRef } from "react";
import * as handpose from "@tensorflow-models/handpose";
import { drawHand } from "./lib/fingers";

const HandposeDetection = ({ webcamRef, canvasRef, setFingersState, playSound }) => {
  const prevFingersState = useRef({
    thumb: false,
    index: false,
    middle: false,
    ring: false,
    pinky: false,
  });

  useEffect(() => {
    const runHandpose = async () => {
      const net = await handpose.load();
      console.log("Handpose model loaded.");

      const detect = async () => {
        if (webcamRef.current?.video?.readyState === 4) {
          const video = webcamRef.current.video;
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          if (videoWidth === 0 || videoHeight === 0) {
            console.error("Invalid video dimensions");
            return;
          }

          // Set video and canvas dimensions
          webcamRef.current.video.width = videoWidth;
          webcamRef.current.video.height = videoHeight;
          canvasRef.current.width = videoWidth;
          canvasRef.current.height = videoHeight;

          // Detect hand pose
          const hand = await net.estimateHands(video);
          updateFingersState(hand);

          const ctx = canvasRef.current.getContext("2d");

          // Clear canvas before drawing (important for preventing residual drawing)
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

          // Draw the hand pose landmarks
          drawHand(hand, ctx, videoWidth, videoHeight);

          // Request the next animation frame
          requestAnimationFrame(detect);
        }
      };

      detect();
    };

    runHandpose();
  }, [webcamRef, canvasRef]);

  const updateFingersState = (hands) => {
    if (hands.length > 0) {
      const hand = hands[0];
      const landmarks = hand.landmarks;

      const thumbState = isFingerOpen(landmarks[4], landmarks[3]);
      const indexState = isFingerOpen(landmarks[8], landmarks[7]);
      const middleState = isFingerOpen(landmarks[12], landmarks[11]);
      const ringState = isFingerOpen(landmarks[16], landmarks[15]);
      const pinkyState = isFingerOpen(landmarks[20], landmarks[19]);

      const newFingersState = {
        thumb: thumbState,
        index: indexState,
        middle: middleState,
        ring: ringState,
        pinky: pinkyState,
      };

      // Only update state if there is a change
      if (!areStatesEqual(newFingersState, prevFingersState.current)) {
        setFingersState(newFingersState);
        prevFingersState.current = newFingersState;
      }

      // Trigger sound only for the open fingers
      if (thumbState && !prevFingersState.current.thumb) playSound("thumb");
      if (indexState && !prevFingersState.current.index) playSound("index");
      if (middleState && !prevFingersState.current.middle) playSound("middle");
      if (ringState && !prevFingersState.current.ring) playSound("ring");
      if (pinkyState && !prevFingersState.current.pinky) playSound("pinky");
    }
  };

  const isFingerOpen = (joint1, joint2) => {
    const distance = Math.sqrt(
      Math.pow(joint1[0] - joint2[0], 2) + Math.pow(joint1[1] - joint2[1], 2)
    );
    return distance > 50; // Adjust threshold based on your needs
  };

  const areStatesEqual = (state1, state2) => {
    return (
      state1.thumb === state2.thumb &&
      state1.index === state2.index &&
      state1.middle === state2.middle &&
      state1.ring === state2.ring &&
      state1.pinky === state2.pinky
    );
  };

  return null;
};

export default HandposeDetection;
