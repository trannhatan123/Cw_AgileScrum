// src/components/HomeModels/Loader.jsx

import React from 'react'
import { Html } from '@react-three/drei'

export default function Loader() {
  return (
    <Html center>
      <div className="p-4 bg-black/60 rounded-md text-white font-semibold">
        Đang tải cảnh 3D…
      </div>
    </Html>
  )
}
