import { useEffect, useRef } from "react";
import { playCalmSound } from "./sound";

const FingerState = ({ fingersState }) => {
  const timeout = useRef(null);

  useEffect(() => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      Object.keys(fingersState).forEach((finger) => {
        if (fingersState[finger]) {
          playCalmSound(finger);
        }
      });
    }, 150);

    return () => clearTimeout(timeout.current); // Cleanup on unmount or fingerState change
  }, [fingersState]);

  return null;
};

export default FingerState;
