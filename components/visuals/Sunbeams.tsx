"use client";

export default function Sunbeams({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute -top-32 -right-32 h-150 w-150 rounded-full bg-yellow-400/10 blur-[160px]" />
      
      <div className="absolute -top-64 -right-64 h-250 w-250 animate-[spin_120s_linear_infinite] opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            // Fix: blur-2xl replaces blur-[40px]
            className="absolute top-1/2 left-1/2 h-24 w-full origin-left -translate-y-1/2 bg-linear-to-r from-yellow-100/30 via-transparent to-transparent blur-2xl"
            style={{ transform: `rotate(${i * 45}deg)` }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,240,150,0.05)_0%,transparent_60%)] mix-blend-screen" />
    </div>
  );
}