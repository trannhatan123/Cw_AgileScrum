// src/components/HomeModels/Starfield.jsx

import React from "react";
import { Stars } from "@react-three/drei";

export default function Starfield() {
  return (
    <Stars
      radius={300}          // tăng chút để bao trọn Fog/Model
    depth={80}            // sâu hơn, tạo lớp sao đậm đặc
     count={15000}         // nhiều ngôi sao hơn
     factor={6}            // variation kích cỡ lớn hơn
     saturation={0.3}      // ngôi sao hơi ngả màu pastel (0.3)
     speed={0.2}           // tốc độ di chuyển nhẹ (tạo cảm giác động)
     fade            // cho hiệu ứng mờ dần ở rìa
    />
  );
}
