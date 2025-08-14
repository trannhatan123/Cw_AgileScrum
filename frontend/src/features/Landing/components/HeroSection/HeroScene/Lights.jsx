// src/components/HomeModels/Lights.jsx

import React from "react";
import * as THREE from "three";

export default function Lights() {
  return (
    <>
      {/* AmbientLight màu xanh lam nhạt để tông cảnh mơ màng */}
      <ambientLight color={new THREE.Color('#334455')} intensity={0.4} />

      {/* HemisphereLight: skyColor (#112244) và groundColor (#220011) */}
      <hemisphereLight skyColor={new THREE.Color('#112244')} groundColor={new THREE.Color('#220011')} intensity={0.3} />

      {/* PointLight tại tâm (Mặt Trời) với màu vàng nhạt, tỏa sáng rộng */}
      <pointLight color={new THREE.Color('#fff3cc')} intensity={1.5} distance={150} decay={2} position={[0, 0, 0]} />

      {/* DirectionalLight tinh chỉnh nhẹ, màu tím than để tăng độ huyền */}
      <directionalLight color={new THREE.Color('#444077')} position={[10, 20, 10]} intensity={0.5} />
    </>
  );
}
