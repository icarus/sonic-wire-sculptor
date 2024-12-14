import { useEffect, useState } from "react";
import { playSound } from "./sound";

export default function Timeline({ lineAnimationDuration, fingersState, setFingersState, steps = 4 }) {
  const [loopGrid, setLoopGrid] = useState(
    Array(5).fill(Array(steps).fill(false)) // 5 rows (fingers) x steps (columns)
  );
  const [activeColumn, setActiveColumn] = useState(0); // To track the active column

  useEffect(() => {
    // Sync the grid with the fingers state
    setLoopGrid((prevGrid) =>
      prevGrid.map((row, rowIndex) => {
        const fingerName = Object.keys(fingersState)[rowIndex];
        if (fingersState[fingerName]) {
          const newRow = Array(steps).fill(false);
          newRow[0] = true; // Activate the first position for that finger
          return newRow;
        }
        return row;
      })
    );
  }, [fingersState, steps]);

  useEffect(() => {
    // Control the step of the red line
    const stepDuration = (lineAnimationDuration * 1000) / steps;

    const interval = setInterval(() => {
      setActiveColumn((prev) => (prev + 1) % steps); // Move to the next column
    }, stepDuration);

    return () => clearInterval(interval);
  }, [lineAnimationDuration, steps]);

  useEffect(() => {
    // Play sounds when passing through the active column
    loopGrid.forEach((row, rowIndex) => {
      if (row[activeColumn]) {
        playSound(Object.keys(fingersState)[rowIndex]); // Play the sound for the corresponding finger
      }
    });
  }, [activeColumn, loopGrid, fingersState]);

  const toggleGridItem = (rowIndex, colIndex) => {
    // Toggle the state of the grid point
    setLoopGrid((prevGrid) =>
      prevGrid.map((row, rIndex) =>
        rIndex === rowIndex
          ? row.map((isActive, cIndex) => (cIndex === colIndex ? true : isActive)) // Ensure only activation
          : row
      )
    );
  };

  return (
    <div className="relative size-full flex flex-col overflow-clip">
      {/* Render the grid with points */}
      <div className="absolute inset-0 flex flex-col gap-0.5 justify-between w-full">
        {loopGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="relative w-full h-full flex gap-0.5 justify-center items-center">
            {row.map((isActive, colIndex) => (
              <div
                key={colIndex}
                className={`size-full cursor-pointer ${
                  isActive ? "!bg-white" : "bg-neutral-800"
                } ${colIndex === activeColumn ? "bg-white/25" : ""}`}
                onClick={() => toggleGridItem(rowIndex, colIndex)} // Handle clicks
              />
            ))}
          </div>
        ))}
      </div>

      <div
        className="absolute inset-0 h-full bg-red-500 w-px animate-line"
        style={{ animationDuration: `${lineAnimationDuration}s` }}
      />
    </div>
  );
}
