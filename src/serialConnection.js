import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { playSound } from './sound'; // Import the playSound function

const SerialConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [port, setPort] = useState(null);
  const [joystickX, setJoystickX] = useState(0);
  const [joystickY, setJoystickY] = useState(0);
  const [buttonPressed, setButtonPressed] = useState(false);

  const connectToArduino = async () => {
    try {
      const port = await navigator.serial.requestPort();
      if (!port) {
        console.error("No serial port selected.");
        return;
      }

      console.log("Selected port:", port);

      await port.open({ baudRate: 9600 });
      setPort(port);

      setIsConnected(true);
      console.log('Connected to Arduino!');
    } catch (err) {
      setError('Failed to connect to Arduino: ' + err.message);
      console.error('Error connecting to Arduino:', err);
    }
  };

  const disconnectFromArduino = async () => {
    try {
      if (port && port.close) {
        await port.close();
        setIsConnected(false);
        console.log('Disconnected from Arduino!');
      }
    } catch (err) {
      console.error('Error disconnecting from Arduino:', err);
    }
  };

  // Function to read data from Arduino
  const readJoystickData = async () => {
    if (port && port.readable) {
      const reader = port.readable.getReader();
      try {
        while (true) {
          const { value, done } = await reader.read();

          if (done) {
            break;
          }

          // Convert the value (a Uint8Array) to a string
          const data = new TextDecoder().decode(value);
          const [x, y] = data.split(',').map(Number);

          // Update joystick state
          setJoystickX(x);
          setJoystickY(y);

          // Check the joystick direction and play corresponding sound
          if (x > 180 && y < 75) {
            // Joystick moved up
            playSound("up");
          } else if (x > 180 && y > 180) {
            // Joystick moved down
            playSound("down");
          } else if (x < 75 && y > 180) {
            // Joystick moved left
            playSound("left");
          } else if (x > 180 && y < 75) {
            // Joystick moved right
            playSound("right");
          }
        }
      } catch (err) {
        console.error('Error reading joystick data:', err);
      } finally {
        reader.releaseLock();
      }
    }
  };

  // Set up the joystick data reading on connect
  useEffect(() => {
    if (isConnected) {
      readJoystickData();
    }
  }, [isConnected]);

  // Handle button press to trigger sound
  const handleButtonPress = () => {
    playSound("button");  // Play sound for button press
  };

  return (
    <>
      <h3>Conexión con Arduino</h3>
      <Button onClick={connectToArduino} disabled={isConnected}>
        {isConnected ? 'Conectado' : 'Conectarse'}
      </Button>
      {isConnected && (
        <div>
          <button onClick={disconnectFromArduino}>Desconéctate</button>

          {/* Joystick X and Y display */}
          <div>
            <label>Joystick X: </label>
            {joystickX}
          </div>
          <div>
            <label>Joystick Y: </label>
            {joystickY}
          </div>

          {/* Button press */}
          <div>
            <label>Button Press: </label>
            <button onClick={() => {
              setButtonPressed(!buttonPressed);
              handleButtonPress();  // Trigger sound on button press
            }}>
              {buttonPressed ? 'Button Pressed' : 'Press Button'}
            </button>
          </div>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default SerialConnection;
