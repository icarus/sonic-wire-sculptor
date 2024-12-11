import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';

const SerialConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [port, setPort] = useState(null);
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

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

  const sendColorData = async () => {
    if (port && port.writable) {
      const writer = port.writable.getWriter();
      const colorData = new Uint8Array([red, green, blue]);
      await writer.write(colorData);
      writer.releaseLock();
    }
  };

  // Use useEffect to send color data immediately when red, green, or blue values change
  useEffect(() => {
    if (isConnected) {
      sendColorData();
    }
  }, [red, green, blue, isConnected]);

  return (
    <>
      <h3>Conexión con Arduino</h3>
      <Button onClick={connectToArduino} disabled={isConnected}>
        {isConnected ? 'Conectado' : 'Conectarse'}
      </Button>
      {isConnected && (
        <div>
          <button onClick={disconnectFromArduino}>Desconéctate</button>
          <div>
            <label>Red: </label>
            <input
              type="range"
              min="0"
              max="255"
              value={red}
              onChange={(e) => setRed(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Green: </label>
            <input
              type="range"
              min="0"
              max="255"
              value={green}
              onChange={(e) => setGreen(parseInt(e.target.value))}
            />
          </div>
          <div>
            <label>Blue: </label>
            <input
              type="range"
              min="0"
              max="255"
              value={blue}
              onChange={(e) => setBlue(parseInt(e.target.value))}
            />
          </div>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default SerialConnection;
