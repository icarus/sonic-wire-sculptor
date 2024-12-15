import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

export const BackgroundBeams = ({ className }) => {
  const beamsRef = useRef(null);
  const beams = useRef([]);
  const frame = useRef(0);

  useEffect(() => {
    const canvas = beamsRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const createBeam = () => {
      const x = Math.random() * canvas.width;
      const angle = Math.random() * Math.PI * 2;
      const length = Math.random() * 200 + 100;
      const width = Math.random() * 2 + 1;
      const speed = Math.random() * 2 + 1;
      const opacity = Math.random() * 0.5 + 0.1;

      beams.current.push({
        x,
        y: -length,
        angle,
        length,
        width,
        speed,
        opacity,
      });
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      beams.current = [];
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame.current++;

      if (frame.current % 20 === 0) {
        createBeam();
      }

      beams.current.forEach((beam, index) => {
        beam.y += beam.speed;

        ctx.save();
        ctx.translate(beam.x, beam.y);
        ctx.rotate(beam.angle);

        const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${beam.opacity})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, beam.length);
        ctx.lineWidth = beam.width;
        ctx.strokeStyle = gradient;
        ctx.stroke();
        ctx.restore();

        if (beam.y > canvas.height + beam.length) {
          beams.current.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={beamsRef}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
    />
  );
};
