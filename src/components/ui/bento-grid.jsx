import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div className={cn("grid gap-4", className)}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  children,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "group relative col-span-1 row-span-1 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm hover:border-white/20 transition-all duration-200",
        className
      )}
    >
      {header}
      <div className="relative z-10">
        <div className="p-4">
          {icon}
          <div className="mt-4 mb-2">
            <p className="text-xs uppercase tracking-widest font-['VCR_OSD_MONO'] mb-2">
              {title}
            </p>
            <p className="text-sm tracking-wide text-white/80">
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-neutral-900/0"
      />
    </motion.div>
  );
};
