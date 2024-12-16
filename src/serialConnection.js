import React, { useState, useEffect, useCallback } from "react";
import { Button } from "./components/ui/button";

const SerialConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [port, setPort] = useState(null);
  const [error, setError] = useState(null);
  const [joystickX, setJoystickX] = useState(0);
  const [joystickY, setJoystickY] = useState(0);
  const [buttonState, setButtonState] = useState(1); // Default to "not pressed"

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

    const reader = port.readable.getReader();
    const decoder = new TextDecoder();

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const text = decoder.decode(value).trim();
        console.log("Raw data:", text);

        // Extract values from the serial data string
        const values = text.split(',');
        if (values.length === 3) {
          const [x, y, button] = values.map(Number);
          console.log("Parsed values:", { x, y, button });
          setJoystickX(x);
          setJoystickY(y);
          setButtonState(button);
        }
      }
    } catch (err) {
      console.error("Error reading from serial port:", err);
    } finally {
      reader.releaseLock();
    }
  }, [port]);

  useEffect(() => {
    if (isConnected) {
      readSerialData();
    }
  }, [isConnected, readSerialData]);

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
