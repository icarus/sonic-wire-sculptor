import { cn } from "../../lib/utils";
import { useEffect, useState } from "react";

export const Meteors = ({ number = 20 }) => {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const newMeteors = [...Array(number)].map((_, index) => ({
      id: index,
      left: Math.floor(Math.random() * 100),
      top: Math.floor(Math.random() * 100),
      size: Math.floor(Math.random() * 2) + 1,
      delay: Math.random() * 2,
    }));
    setMeteors(newMeteors);
  }, [number]);

  return (
    <>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className={cn(
            "absolute rounded-full bg-white opacity-50 animate-meteor",
            "pointer-events-none"
          )}
          style={{
            left: meteor.left + "%",
            top: meteor.top + "%",
            width: meteor.size + "px",
            height: meteor.size * 20 + "px",
            animationDelay: meteor.delay + "s",
          }}
        />
      ))}
    </>
  );
};
