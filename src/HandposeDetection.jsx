import React, { useEffect } from "react";
import * as handpose from "@tensorflow-models/handpose";

const HandposeDetection = ({ webcamRef, canvasRef, setFingersState, playSound }) => {
  useEffect(() => {
    const runHandpose = async () => {
      const net = await handpose.load();
      console.log("Handpose model loaded.");

      setInterval(() => {
        detect(net);
      }, 200);
    };

    const detect = async (net) => {
      if (webcamRef.current?.video?.readyState === 4) {
        const video = webcamRef.current.video;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        if (videoWidth === 0 || videoHeight === 0) {
          console.error("Invalid video dimensions");
          return;
        }

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const hand = await net.estimateHands(video);
        updateFingersState(hand);
      }
    };

    runHandpose();
  }, [webcamRef, canvasRef]);

  const updateFingersState = (hands) => {
    if (hands.length > 0) {
      const hand = hands[0];
      const landmarks = hand.landmarks;

      const thumbState = isFingerOpen(landmarks[3], landmarks[2]);
      const indexState = isFingerOpen(landmarks[6], landmarks[5]);
      const middleState = isFingerOpen(landmarks[10], landmarks[9]);
      const ringState = isFingerOpen(landmarks[14], landmarks[13]);
      const pinkyState = isFingerOpen(landmarks[18], landmarks[17]);

      setFingersState({
        thumb: thumbState,
        index: indexState,
        middle: middleState,
        ring: ringState,
        pinky: pinkyState,
      });

      playSound(thumbState, indexState, middleState, ringState, pinkyState);
    }
  };

  const isFingerOpen = (joint1, joint2) => {
    const distance = Math.sqrt(
      Math.pow(joint1[0] - joint2[0], 2) + Math.pow(joint1[1] - joint2[1], 2)
    );
    return distance > 50; // Adjust distance threshold for your needs
  };

  return null;
};

export default HandposeDetection;
