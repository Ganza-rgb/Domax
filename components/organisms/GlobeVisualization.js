'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false })

// Sample data: major regions/countries with educator presence
const EDUCATOR_DATA = [
  { lat: 40.7128, lng: -74.006, size: 0.8, name: 'United States', educators: 3500 },
  { lat: 51.5074, lng: -0.1278, size: 0.6, name: 'United Kingdom', educators: 1200 },
  { lat: 48.8566, lng: 2.3522, size: 0.5, name: 'France', educators: 850 },
  { lat: 52.52, lng: 13.405, size: 0.5, name: 'Germany', educators: 920 },
  { lat: -33.8688, lng: 151.2093, size: 0.6, name: 'Australia', educators: 1100 },
  { lat: 35.6762, lng: 139.6503, size: 0.7, name: 'Japan', educators: 1450 },
  { lat: 1.3521, lng: 103.8198, size: 0.4, name: 'Singapore', educators: 650 },
  { lat: -23.5505, lng: -46.6333, size: 0.5, name: 'Brazil', educators: 780 },
  { lat: 39.9042, lng: 116.4074, size: 0.7, name: 'China', educators: 1600 },
  { lat: 28.7041, lng: 77.1025, size: 0.6, name: 'India', educators: 1300 },
  { lat: 37.7749, lng: -122.4194, size: 0.55, name: 'San Francisco, USA', educators: 950 },
  { lat: 34.0522, lng: -118.2437, size: 0.6, name: 'Los Angeles, USA', educators: 1100 },
  { lat: 43.6629, lng: -79.3957, size: 0.45, name: 'Toronto, Canada', educators: 750 },
  { lat: 55.7558, lng: 37.6173, size: 0.5, name: 'Moscow, Russia', educators: 820 },
]

export default function GlobeVisualization() {
  const globeEl = useRef()
  const containerRef = useRef()
  const [rotation, setRotation] = useState({ x: 0.5, y: 0.3 })
  const [hoveredPoint, setHoveredPoint] = useState(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!globeEl.current) return

    // Configure globe
    globeEl.current.controls().autoRotate = true
    globeEl.current.controls().autoRotateSpeed = 1.5

    // Styling
    globeEl.current.pointOfView({ altitude: 2.5 }, 0)

    // Set initial rotation
    globeEl.current.controls().rotateX(rotation.x)
    globeEl.current.controls().rotateY(rotation.y)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Enhanced point styling with glow effect
  const getPointMaterial = (point) => {
    return {
      size: point.size * 1.2,
      sizeScale: 50,
      color: hoveredPoint?.name === point.name ? '#00cd90' : '#005ffe',
      emissive: hoveredPoint?.name === point.name ? '#00cd90' : '#004ad9',
    }
  }

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">

      {/* Globe container */}
      <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden">
        <Globe
          ref={globeEl}
          width={typeof window !== 'undefined' ? containerRef.current?.clientWidth || 500 : 500}
          height={typeof window !== 'undefined' ? containerRef.current?.clientHeight || 400 : 400}
          backgroundColor="rgba(255, 255, 255, 0)"
          showAtmosphere={true}
          atmosphereColor="#e8f2ff"
          atmosphereAltitude={0.10}
          globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
          pointsData={EDUCATOR_DATA}
          pointLabel={(d) => `<div style="background: #0A3059; color: white; padding: 8px 12px; border-radius: 6px; font-size: 12px; border: 1px solid #00cd90;"><strong>${d.name}</strong><br/>Educators: ${d.educators}</div>`}
          pointColor={(d) => (hoveredPoint?.name === d.name ? '#00cd90' : '#005ffe')}
          pointSize={(d) => d.size}
          pointAltitude={0.1}
          pointOpacity={0.8}
          onPointHover={setHoveredPoint}
          pointResolution={4}
          // Glow effect on hovered points
          pointsMerge={false}
          pointLat="lat"
          pointLng="lng"
        />
      </div>

      {/* Bottom gradient fade for depth */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-2xl sm:rounded-b-3xl" />

      {/* Floating info card on hover */}
      {hoveredPoint && (
        <div className="absolute bottom-6 left-6 right-6 z-20 animate-fade-in">
          <div className="bg-white border-2 border-[#005ffe] rounded-lg p-4 shadow-lg">
            <p className="text-sm font-semibold text-[#0A3059] mb-1">{hoveredPoint.name}</p>
            <p className="text-xs text-gray-600">
              <span className="text-[#00cd90] font-bold">{hoveredPoint.educators.toLocaleString()}</span> educators
            </p>
          </div>
        </div>
      )}

      {/* Legend/info overlay */}
      <div className="absolute top-6 left-6 z-20 hidden sm:block">
        <div className="bg-white/90 backdrop-blur rounded-lg px-4 py-3 text-xs text-gray-600 shadow-md border border-[#d8ddff]">
          <p className="font-semibold text-[#0A3059] mb-2">Domax Global Reach</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#005ffe]" />
              <span>Active Educators</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00cd90]" />
              <span>Region Focused</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading pulse indicator */}
      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(0, 205, 144, 0.5);
          }
          50% {
            text-shadow: 0 0 15px rgba(0, 205, 144, 0.8);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
