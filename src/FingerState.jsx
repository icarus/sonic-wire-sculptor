import React, { useEffect } from "react";
import { playCalmSound } from "./sound";

let timeout;

const FingerState = ({ fingersState }) => {
  useEffect(() => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      if (fingersState.thumb) {
        playCalmSound("thumb");
      }
      if (fingersState.index) {
        playCalmSound("index");
      }
      if (fingersState.middle) {
        playCalmSound("middle");
      }
      if (fingersState.ring) {
        playCalmSound("ring");
      }
      if (fingersState.pinky) {
        playCalmSound("pinky");
      }
    }, 150);
  }, [fingersState]);

  return null;
};

export default FingerState;
