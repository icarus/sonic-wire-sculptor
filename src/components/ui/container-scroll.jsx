import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "../../lib/utils";

export const ContainerScroll = ({
  titleComponent,
  children,
  className,
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const position = useTransform(scrollYProgress, (pos) => {
    return pos === 1 ? "relative" : "fixed";
  });

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative mb-[-100vh] h-[300vh]", className)}
    >
      <motion.div
        style={{ opacity, scale, position }}
        className="sticky top-0 flex min-h-screen w-full items-center justify-center"
      >
        <div className="relative flex w-full flex-col items-center justify-center">
          {titleComponent}
          <motion.div
            style={{ opacity, scale }}
            className="relative mt-16 w-full"
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
