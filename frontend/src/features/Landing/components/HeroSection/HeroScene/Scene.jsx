import React, { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";

import Loader from "./Loader";
import { SolarSystem1 } from "../Models/SolarSystem1";
import Lights from "./Lights";
import Starfield from "./Starfield";

import gsap from "gsap";

export default function Scene() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        pixelRatio={
          typeof window !== "undefined"
            ? Math.min(window.devicePixelRatio, 1.5)
            : 1
        }
        camera={{ position: [80, 30, 20], fov: 30 }}
        className="absolute inset-0"
      >
        {/* --- SƯƠNG MỜ (Fog) --- */}
        <fog attach="fog" args={["#000022", 10, 200]} />
        {/* --- LIGHTS --- */}
        <Lights />
        {/* --- STARFIELD --- */}
        <Starfield />
        {/* --- ENVIRONMENT --- */}
        <Environment preset="night" background={false} />
        {/* --- SOLAR SYSTEM MODEL --- */}
        <Suspense fallback={<Loader />}>
          <SolarSystem1 scale={0.4} position={[0, 0, 0]} />
        </Suspense>
        {/* --- POST PROCESSING --- */}
        <Bloom
          luminanceThreshold={10}
          luminanceSmoothing={10}
          intensity={0.1}
          height={300}
        />
        <ChromaticAberration offset={[0.001, 0.001]} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        {/* --- ORBIT CONTROLS --- */}
        <OrbitControls
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.3}
          enablePan={true}
          minDistance={5}
          maxDistance={30}
          // Khi người dùng bắt đầu tương tác (click-drag), tắt autoRotate
          onStart={(e) => {
            if (e.target && e.target.autoRotate !== undefined)
              e.target.autoRotate = false;
          }}
          // Khi kết thúc tương tác, bật lại autoRotate
          onEnd={(e) => {
            if (e.target && e.target.autoRotate !== undefined)
              e.target.autoRotate = true;
          }}
        />
      </Canvas>
    </div>
  );
}
