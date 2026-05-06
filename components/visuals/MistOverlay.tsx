export default function MistOverlay({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Animated Fog Clouds */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)] blur-[80px] animate-pulse" />
      <div className="absolute top-0 left-0 w-full h-full bg-slate-900/10 backdrop-blur-[2px]" />
    </div>
  );
}