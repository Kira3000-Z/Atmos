export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0f101a] text-white">
      <div className="flex flex-col items-center gap-4">
        {/* A sleek, spinning neon ring to match your UI */}
        <div className="w-12 h-12 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
        <p className="text-gray-400 text-sm tracking-widest uppercase">Loading Atmos...</p>
      </div>
    </div>
  );
}