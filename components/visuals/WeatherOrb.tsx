"use client";
import React, { memo } from "react";
import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";

interface WeatherOrbProps {
  themeColor: string;
  windSpeed: number; // New: React to environment
}

const WeatherOrb = memo(({ themeColor, windSpeed }: WeatherOrbProps) => {
  // Map wind speed to a reasonable distortion range (e.g., 2 to 10)
  const distortSpeed = Math.min(Math.max(windSpeed / 2, 2), 10);

  return (
    <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 5] }}
        dpr={[1, 2]} 
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} color={themeColor} intensity={2} />
        
        <Float speed={distortSpeed / 2} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere args={[1.4, 32, 32]}>
            <MeshDistortMaterial
              color={themeColor}
              speed={distortSpeed} 
              distort={0.35}
              radius={1}
              metalness={0.8}
              roughness={0.2}
            />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
});

WeatherOrb.displayName = "WeatherOrb";
export default WeatherOrb;