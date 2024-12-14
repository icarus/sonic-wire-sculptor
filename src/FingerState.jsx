import { useEffect, useRef } from "react";
import { playSound } from "./sound";

const FingerState = ({ fingersState }) => {
  const timeout = useRef(null);

  useEffect(() => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      Object.keys(fingersState).forEach((finger) => {
        if (fingersState[finger]) {
          playSound(finger);
        }
      });
    }, 150);

    return () => clearTimeout(timeout.current);
  }, [fingersState]);

  return null;
};

export default FingerState;
