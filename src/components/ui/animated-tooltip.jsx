import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../../lib/utils";

export const AnimatedTooltip = ({
  items,
  className,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn(
        "flex flex-row items-center justify-center gap-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item?.name}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.div
            className="relative size-16 rounded-full"
            animate={{
              scale: hoveredIndex === idx ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={item?.image}
              className="size-full rounded-full object-cover border-2 border-white/20"
              alt={item?.name}
            />
          </motion.div>
          {hoveredIndex === idx && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 10,
              }}
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center rounded-lg bg-black/90 backdrop-blur-sm z-50 shadow-xl px-4 py-2"
            >
              <div className="absolute inset-x-10 h-px -bottom-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="absolute left-10 right-10 h-px -top-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="text-sm text-white font-bold">{item?.name}</div>
              {item?.designation && (
                <div className="text-xs text-white/80">{item?.designation}</div>
              )}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div className="w-2 h-2 bg-black/90 rotate-45 transform origin-center" />
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};
