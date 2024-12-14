import React, { useEffect, useRef } from 'react';

const WaveformVisualizer = ({ activeColumn, loopGrid }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw waveform
      ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 0.5;

      const points = 100;
      for (let i = 0; i < points; i++) {
        const x = (width / points) * i;
        let y = height / 2;

        // Calculate amplitude based on active cells
        loopGrid.forEach((row, rowIndex) => {
          if (row[activeColumn]) {
            const frequency = (rowIndex + 1) * 2;
            y += Math.sin(i * frequency * 0.1 + Date.now() * 0.01) * 20;
          }
        });

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Add glow effect
      ctx.shadowBlur = 2;
      ctx.shadowColor = 'red';
      ctx.stroke();

      requestAnimationFrame(draw);
    };

    draw();
  }, [activeColumn, loopGrid]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      width={window.innerWidth}
      height={200}
    />
  );
};

export default WaveformVisualizer;
