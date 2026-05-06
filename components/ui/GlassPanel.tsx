"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function GlassPanel({ children, className }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2deg", "-2deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2deg", "2deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`glass rounded-3xl transition-colors duration-500 relative group ${className}`}
    >
      <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/20 group-hover:border-blue-400/40" />
      <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/20 group-hover:border-blue-400/40" />
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
}