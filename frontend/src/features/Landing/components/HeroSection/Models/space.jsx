import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/models/need_some_space.glb");

export function Space({
  scale = 0.013,
  rotation = [-Math.PI / 2, 0, 0],
  position = [0, 0, 0],
  autoRotate = false,
  ...props
}) {
  const ref = useRef();
  const { nodes } = useGLTF("/models/need_some_space.glb");

  useFrame(() => {
    if (autoRotate && ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  // Mảng màu: xanh, tím nhạt, trắng/bạc
  const palette = [
    "#299bff",      // Xanh dương
    "#bc8cff",      // Tím nhạt
    "#f5f5f5",      // Trắng (hoặc #c0c0c0 cho bạc)
    "#c0c0c0",      // Bạc (tuỳ bạn thích dùng bạc hay trắng)
  ];

  const colors = useMemo(() => {
    const pos = nodes.Object_2.geometry.attributes.position;
    const count = pos.count;
    const colorArr = [];
    for (let i = 0; i < count; i++) {
      // Chọn ngẫu nhiên một màu trong palette
      const hex = palette[Math.floor(Math.random() * palette.length)];
      const color = new THREE.Color(hex);
      colorArr.push(color.r, color.g, color.b);
    }
    return new Float32Array(colorArr);
  }, [nodes]);

  if (nodes.Object_2.geometry) {
    nodes.Object_2.geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );
  }

  if (!nodes?.Object_2) {
    return (
      <Center>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="grey" wireframe />
        </mesh>
      </Center>
    );
  }

  return (
    <Center scale={scale} rotation={rotation} position={position} {...props}>
      <points ref={ref} geometry={nodes.Object_2.geometry}>
        <pointsMaterial
          attach="material"
          vertexColors
          size={0.013}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </Center>
  );
}
