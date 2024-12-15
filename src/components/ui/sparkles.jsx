import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

export const SparklesCore = ({
  id,
  background,
  minSize,
  maxSize,
  particleDensity,
  className,
  particleColor,
}) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let frame = 0;

    const createParticles = () => {
      const particleCount = particleDensity || 50;
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (maxSize - minSize) + minSize || Math.random() * 2 + 1,
          speedX: (Math.random() * 1 - 0.5) * 0.5,
          speedY: (Math.random() * 1 - 0.5) * 0.5,
          life: Math.random() * 0.5 + 0.7,
        });
      }
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles.current = [];
      createParticles();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      particles.current.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life -= 0.002;

        if (particle.x < 0 || particle.x > canvas.width ||
            particle.y < 0 || particle.y > canvas.height ||
            particle.life <= 0) {
          particles.current.splice(index, 1);
        } else {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particleColor || `rgba(255, 255, 255, ${particle.life})`;
          ctx.fill();
        }
      });

      if (frame % 4 === 0 && particles.current.length < particleDensity) {
        createParticles();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [maxSize, minSize, particleColor, particleDensity]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      style={{
        background: background || "transparent",
      }}
      className={cn("absolute inset-0 w-full h-full", className)}
    />
  );
};
