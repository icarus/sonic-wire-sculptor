import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "./components/ui/button";

const SerialConnection = ({
  isConnected,
  setIsConnected,
  port,
  setPort,
  joystickX,
  setJoystickX,
  joystickY,
  setJoystickY,
  buttonState,
  setButtonState
}) => {
  const [error, setError] = useState(null);
  const readerRef = useRef(null);
  const keepReadingRef = useRef(true);

  const connectToSerial = async () => {
    try {
      const selectedPort = await navigator.serial.requestPort();
      await selectedPort.open({ baudRate: 9600 });
      setPort(selectedPort);
      setIsConnected(true);
      console.log("Connected to Arduino!");
    } catch (err) {
      console.error("Connection error:", err);
      setError(`Failed to connect: ${err.message}`);
    }
  };

  const disconnectFromSerial = async () => {
    try {
      keepReadingRef.current = false;
      if (readerRef.current) {
        await readerRef.current.cancel();
      }
      if (port) {
        await port.close();
        setPort(null);
        setIsConnected(false);
        console.log("Disconnected from Arduino!");
      }
    } catch (err) {
      console.error("Disconnection error:", err);
      setError(`Failed to disconnect: ${err.message}`);
    }
  };

  const readSerialData = useCallback(async () => {
    if (!port || !port.readable) {
      console.error("Port not readable");
      return;
    }

    keepReadingRef.current = true;

    try {
      while (keepReadingRef.current && port.readable) {
        const reader = port.readable.getReader();
        readerRef.current = reader;

        try {
          while (keepReadingRef.current) {
            const { value, done } = await reader.read();
            if (done) break;

            const text = new TextDecoder().decode(value).trim();

            const values = text.split(',');
            if (values.length === 3) {
              const [x, y, button] = values.map(Number);
              setJoystickX(x);
              setJoystickY(y);
              setButtonState(button);
            }
          }
        } catch (error) {
          console.error("Error reading data:", error);
        } finally {
          reader.releaseLock();
        }
      }
    } catch (error) {
      console.error("Error setting up reader:", error);
    }
  }, [port, setJoystickX, setJoystickY, setButtonState]);

  useEffect(() => {
    if (isConnected) {
      readSerialData();
    }
    return () => {
      keepReadingRef.current = false;
      if (readerRef.current) {
        readerRef.current.cancel();
      }
    };
  }, [isConnected, readSerialData]);

  useEffect(() => {
    return () => {
      disconnectFromSerial();
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h3>Arduino Joystick Controller</h3>
      <Button
        variant="outline"
        className="hover:bg-white/10"
        onClick={isConnected ? disconnectFromSerial : connectToSerial}
      >
        {isConnected ? "Disconnect" : "Connect"}
      </Button>

      {isConnected && (
        <div className="flex flex-col gap-2 text-sm text-white">
          <div>Joystick X: {joystickX}</div>
          <div>Joystick Y: {joystickY}</div>
          <div>Button State: {buttonState === 0 ? "Pressed" : "Released"}</div>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SerialConnection;
