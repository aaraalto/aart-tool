import { useEffect, useRef } from 'react'
import { initializePaper, drawArt } from '../utils/paperUtils'

type Settings = {
  complexity: number
  speed: number
  color: string
}

type CanvasProps = {
  settings: Settings
}

export default function Canvas({ settings }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      initializePaper(canvasRef.current)
    }
  }, [])

  useEffect(() => {
    drawArt(settings)
  }, [settings])

  return <canvas ref={canvasRef} className="w-3/4 h-full" />
}

