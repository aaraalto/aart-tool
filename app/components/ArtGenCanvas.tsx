'use client'

import { useEffect, useRef } from 'react'
import { createArtwork } from '../lib/artgen'
import { Settings } from '../types'

type ArtGenCanvasProps = {
  settings: Settings
  shouldUpdate: boolean
  onUpdateComplete: () => void
}

export default function ArtGenCanvas({ settings, shouldUpdate, onUpdateComplete }: ArtGenCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const settingsRef = useRef(settings)
  const animationRef = useRef<number>()
  const artworkRef = useRef<ReturnType<typeof createArtwork> | null>(null)

  useEffect(() => {
    settingsRef.current = settings
  }, [settings])

  const initializeArtwork = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }
    resizeCanvas()

    // Initialize artwork
    artworkRef.current = createArtwork({
      width: canvas.width,
      height: canvas.height,
      particleCount: settingsRef.current.complexity,
      speed: settingsRef.current.speed / 50,
      color: settingsRef.current.color,
      shape: settingsRef.current.shape,
      particleSize: settingsRef.current.particleSize,
      trailLength: settingsRef.current.trailLength,
    })

    // Animation loop
    let lastTime = 0
    const animate = (time: number) => {
      const deltaTime = time - lastTime
      lastTime = time

      // Clear with trail effect
      ctx.fillStyle = `rgba(28, 28, 28, ${0.1 * (100 - settingsRef.current.trailLength) / 100})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw artwork
      if (artworkRef.current) {
        artworkRef.current.update(deltaTime)
        artworkRef.current.draw(ctx)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    animationRef.current = requestAnimationFrame(animate)

    // Handle resize
    window.addEventListener('resize', resizeCanvas)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }

  useEffect(initializeArtwork, [])

  useEffect(() => {
    if (shouldUpdate) {
      initializeArtwork()
      onUpdateComplete()
    }
  }, [shouldUpdate, onUpdateComplete])

  return (
    <div className="w-full h-full relative bg-[#1c1c1c]">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  )
}

