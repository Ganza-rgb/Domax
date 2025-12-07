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
  const pinModelRef = useRef(null)

  // Create pin model once and reuse it
  const createPinModel = () => {
    if (pinModelRef.current) return pinModelRef.current

    const group = new THREE.Group()

    // Pin stem - thin cylinder
    const stemGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.6, 8)
    const stemMaterial = new THREE.MeshPhongMaterial({
      color: '#00cd90',
      emissive: '#00cd90',
      emissiveIntensity: 0.6,
      shininess: 100
    })
    const stem = new THREE.Mesh(stemGeometry, stemMaterial)
    stem.position.y = 0.3
    stem.castShadow = true
    group.add(stem)

    // Pin head - glowing sphere
    const headGeometry = new THREE.SphereGeometry(0.1, 12, 12)
    const headMaterial = new THREE.MeshPhongMaterial({
      color: '#00cd90',
      emissive: '#00cd90',
      emissiveIntensity: 1,
      shininess: 100
    })
    const head = new THREE.Mesh(headGeometry, headMaterial)
    head.position.y = 0.65
    head.castShadow = true
    group.add(head)

    // Glow effect ring
    const ringGeometry = new THREE.TorusGeometry(0.13, 0.012, 8, 16)
    const ringMaterial = new THREE.MeshPhongMaterial({
      color: '#00cd90',
      emissive: '#00cd90',
      emissiveIntensity: 0.8
    })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.position.y = 0.65
    ring.rotation.x = Math.PI / 4
    group.add(ring)

    pinModelRef.current = group
    return group
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!globeEl.current) return

      try {
        // Disable all user controls
        if (globeEl.current.controls && typeof globeEl.current.controls === 'function') {
          const controls = globeEl.current.controls()
          if (controls) {
            controls.enableZoom = false
            controls.enablePan = false
            controls.enableRotate = false
            // Enable auto-rotate
            controls.autoRotate = true
            controls.autoRotateSpeed = 2.5
          }
        }

        // Set initial view - responsive altitude based on screen size
        if (globeEl.current.pointOfView && typeof globeEl.current.pointOfView === 'function') {
          const isMobile = window.innerWidth < 768
          const altitude = isMobile ? 5.2 : 2.4
          globeEl.current.pointOfView(
            { lat: 20, lng: 0, altitude },
            1800
          )
        }

        // Add lighting
        if (globeEl.current.scene && typeof globeEl.current.scene === 'function') {
          const scene = globeEl.current.scene()
          scene.add(new THREE.AmbientLight(0xffffff, 1.2))
          const dirLight = new THREE.DirectionalLight(0xffffff, 1)
          dirLight.position.set(5, 3, 5)
          scene.add(dirLight)
        }
      } catch (err) {
        console.log('Globe initialization error:', err)
      }
    }, 800)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden flex items-center justify-center bg-transparent"
    >

      <Globe
        ref={globeEl}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#005ffe"
        atmosphereAltitude={0.10}

        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"

        // Remove point-based markers
        pointsData={[]}

        // Use 3D objects for realistic pins
        objectsData={regionData}
        objectLat={(d) => d.lat}
        objectLng={(d) => d.lng}
        objectAltitude={(d) => 0.08}
        objectThreeObject={() => {
          // Clone the pin model to avoid reusing same instance
          const pinModel = createPinModel()
          const clonedPin = pinModel.clone()
          clonedPin.traverse((child) => {
            if (child.geometry) child.geometry = child.geometry.clone()
            if (child.material) child.material = child.material.clone()
          })
          return clonedPin
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
