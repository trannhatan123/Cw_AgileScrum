import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Space } from "./Models/space";
import gsap from "gsap";

// Tạo một component để animate camera
function AnimateCamera() {
  const { camera } = useThree();

  useEffect(() => {
    // camera.position = [1, 1.5, 2] ban đầu (theo prop bạn để)
    gsap.fromTo(
      camera.position,
      { x: 2.5, y: 3.5, z: 6 }, // Vị trí xa ban đầu
      {
        x: 1,
        y: 1.5,
        z: 2,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          camera.updateProjectionMatrix();
        }
      }
    );
  }, [camera]);

  return null;
}

export default function SpaceCanvas({ style, ...props }) {
  return (
    <div style={{ width: "100%", height: "100%", ...style }}>
      <Canvas camera={{ position: [1, 1.5, 2], fov: 50 }} {...props}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} />

        <Space />

        <OrbitControls enablePan={false} enableZoom={true} />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.15}
            intensity={2.2}
          />
        </EffectComposer>
        <AnimateCamera /> {/* Thêm này vào để animate camera */}
      </Canvas>
    </div>
  );
}
