'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, Suspense } from 'react'
import * as THREE from 'three'

// Avoid SSR for react-globe.gl
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

// Data locations
const regionData = [
  { lat: 40.7128, lng: -74.0060, label: 'North America' },
  { lat: 48.8566, lng: 2.3522, label: 'Europe' },
  { lat: 35.6762, lng: 139.6503, label: 'Asia Pacific' },
  { lat: -33.8688, lng: 151.2093, label: 'Oceania' },
  { lat: -15.7975, lng: -47.8919, label: 'South America' },
  { lat: 30.0444, lng: 31.2357, label: 'Africa' },
  { lat: 25.2048, lng: 55.2708, label: 'Middle East' }
]

function GlobeContent() {
  const globeEl = useRef()
  const containerRef = useRef()

  useEffect(() => {
    if (!globeEl.current) return

    // Auto-rotate + behavior
    const controls = globeEl.current.controls()
    controls.autoRotate = true
    controls.autoRotateSpeed = 2.4
    controls.enableZoom = false
    controls.enablePan = false

    // Initial view
    globeEl.current.pointOfView(
      { lat: 20, lng: 0, altitude: 2.4 },
      1800
    )

    // Add lighting like Bunny.net
    const scene = globeEl.current.scene()
    scene.add(new THREE.AmbientLight(0xffffff, 1.2))

    const dirLight = new THREE.DirectionalLight(0xffffff, 1)
    dirLight.position.set(5, 3, 5)
    scene.add(dirLight)

  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden flex items-center justify-center bg-transparent"
    >

      <Globe
        ref={globeEl}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere
        atmosphereColor="#005ffe"
        atmosphereAltitude={0.18}

        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"

        // REMOVE POINTS — we will use 3D pins instead
        pointsData={[]}

        // 3D Pins (this makes it look like Bunny)
        objectsData={regionData}
        objectLat={(d) => d.lat}
        objectLng={(d) => d.lng}
        objectAltitude={0.015}
        objectThreeObject={() => {
          const group = new THREE.Group()

          // Pin stem
          const stemGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.35, 12)
          const stemMat = new THREE.MeshStandardMaterial({
            color: '#00e6b8',
            emissive: '#00e6b8',
            emissiveIntensity: 0.6
          })
          const stem = new THREE.Mesh(stemGeom, stemMat)
          stem.position.y = 0.18
          group.add(stem)

          // Pin head (glowing sphere)
          const headGeom = new THREE.SphereGeometry(0.07, 20, 20)
          const headMat = new THREE.MeshStandardMaterial({
            color: '#00ffd0',
            emissive: '#00ffd0',
            emissiveIntensity: 1
          })
          const head = new THREE.Mesh(headGeom, headMat)
          head.position.y = 0.37
          group.add(head)

          return group
        }}
      />

      {/* Soft center gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-radial from-[#00e6b822] via-transparent to-transparent rounded-full blur-3xl" />
      </div>
    </div>
  )
}

export default function DomaxGlobe() {
  return (
    <Suspense fallback={<div className="w-full h-full bg-gray-200" />}>
      <GlobeContent />
    </Suspense>
  )
}
