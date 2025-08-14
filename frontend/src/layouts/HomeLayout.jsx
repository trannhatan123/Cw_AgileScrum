// src/layouts/HomeLayout.jsx
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import HomeHeader from '../features/Landing/components/HeroSection/Header/HeroNavbar'

import Footer from '../components/ui/Footer'
import { getAllPlanets } from '../services/planetService'

export default function HomeLayout() {
  const navigate = useNavigate()

  const [planets, setPlanets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Lần đầu mount thì fetch danh sách hành tinh
  useEffect(() => {
    async function fetchPlanets() {
      try {
        setLoading(true)
        setError('')
        const res = await getAllPlanets()
        setPlanets(res.data)
      } catch (err) {
        console.error(err)
        setError('Không tải được dữ liệu hành tinh.')
      } finally {
        setLoading(false)
      }
    }
    fetchPlanets()
  }, [])

  const handleCardClick = (slug) => {
    navigate(`/planets/${slug}`)
  }

  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-black">
      {/* Header full‐screen (3D scene, menu…) */}
      <HomeHeader />

      {/* Nơi render phần hero của Home.jsx */}
      <div className="pointer-events-auto">
        <Outlet />
      </div>

     
      {/* Footer */}
      <Footer />
    </div>
  )
}
