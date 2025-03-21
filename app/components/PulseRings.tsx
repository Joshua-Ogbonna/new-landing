'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface PulseRingsProps {
  imageUrl?: string;
  imageSize?: number;
  ringsColor?: string;
  pulseSpeed?: number;
  ringThickness?: number;
  maxRingExpansion?: number;
}

export default function PulseRings({ 
  imageUrl = '/placeholder.jpg', 
  imageSize = 100,
  ringsColor = '#3498db',
  pulseSpeed = 2,
  ringThickness = 4,
  maxRingExpansion = 2.5
}: PulseRingsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    // Clean up any existing animations before creating new ones
    container.innerHTML = ''
    
    // Create the central image
    const imageContainer = document.createElement('div')
    imageContainer.style.position = 'relative'
    imageContainer.style.width = `${imageSize}px`
    imageContainer.style.height = `${imageSize}px`
    imageContainer.style.borderRadius = '50%'
    imageContainer.style.overflow = 'hidden'
    imageContainer.style.zIndex = '10'
    container.appendChild(imageContainer)

    // Add the image element using Next.js Image component
    const img = document.createElement('img')
    img.src = imageUrl
    img.alt = 'Central image'
    img.style.width = '100%'
    img.style.height = '100%'
    img.style.objectFit = 'cover'
    imageContainer.appendChild(img)
    
    // Create 4 pulse rings with staggered animations
    for (let i = 0; i < 4; i++) {
      createPulseRing(container, imageSize, ringsColor, pulseSpeed, i * 0.5, ringThickness, maxRingExpansion)
    }
  }, [imageUrl, imageSize, ringsColor, pulseSpeed, ringThickness, maxRingExpansion])

  function createPulseRing(
    container: HTMLDivElement, 
    size: number, 
    color: string, 
    duration: number, 
    delay: number, 
    thickness: number, 
    maxExpansion: number
  ): void {
    const ring = document.createElement('div')
    
    // Base styling
    ring.style.position = 'absolute'
    ring.style.top = '50%'
    ring.style.left = '50%'
    ring.style.width = `${size}px`
    ring.style.height = `${size}px`
    ring.style.borderRadius = '50%'
    ring.style.border = `${thickness}px solid ${color}`
    ring.style.transform = 'translate(-50%, -50%)'
    ring.style.opacity = '0.8'
    
    // Animation
    ring.animate([
      { 
        width: `${size}px`, 
        height: `${size}px`, 
        opacity: 0.8 
      },
      { 
        width: `${size * maxExpansion}px`, 
        height: `${size * maxExpansion}px`, 
        opacity: 0 
      }
    ], {
      duration: duration * 1000,
      iterations: Infinity,
      delay: delay * 1000
    })
    
    container.appendChild(ring)
  }

  return (
    <div className="flex items-center justify-center w-full h-64">
      <div ref={containerRef} className="relative" style={{ width: `${imageSize * 3}px`, height: `${imageSize * 3}px` }} />
    </div>
  )
}