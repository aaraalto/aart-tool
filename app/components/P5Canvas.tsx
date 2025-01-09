'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const P5 = dynamic(() => import('p5').then((mod) => mod.default), { ssr: false })

type Settings = {
  complexity: number
  speed: number
  color: string
  aiEnabled: boolean
  shape: string
  particleSize: number
  trailLength: number
}

type P5CanvasProps = {
  settings: Settings
  shouldUpdate: boolean
  onUpdateComplete: () => void
}

export default function P5Canvas({ settings, shouldUpdate, onUpdateComplete }: P5CanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [p5Instance, setP5Instance] = useState<any>(null)
  const settingsRef = useRef(settings)

  useEffect(() => {
    settingsRef.current = settings
  }, [settings])

  useEffect(() => {
    if (canvasRef.current && !p5Instance) {
      const sketch = (p: any) => {
        let particles: Particle[] = []
        let flowField: p5.Vector[][] = []
        const cols = 20
        const rows = 20

        class Particle {
          pos: p5.Vector
          vel: p5.Vector
          acc: p5.Vector
          maxSpeed: number
          prevPos: p5.Vector
          color: p5.Color

          constructor() {
            this.pos = p.createVector(p.random(p.width), p.random(p.height))
            this.vel = p.createVector(0, 0)
            this.acc = p.createVector(0, 0)
            this.maxSpeed = p.random(2, 4)
            this.prevPos = this.pos.copy()
            this.color = p.color(settingsRef.current.color)
          }

          update() {
            this.vel.add(this.acc)
            this.vel.limit(this.maxSpeed)
            this.pos.add(this.vel)
            this.acc.mult(0)
          }

          applyForce(force: p5.Vector) {
            this.acc.add(force)
          }

          show() {
            p.stroke(this.color)
            p.strokeWeight(settingsRef.current.particleSize)
            p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
            this.updatePrev()
          }

          updatePrev() {
            this.prevPos.x = this.pos.x
            this.prevPos.y = this.pos.y
          }

          edges() {
            if (this.pos.x > p.width) this.pos.x = 0
            if (this.pos.x < 0) this.pos.x = p.width
            if (this.pos.y > p.height) this.pos.y = 0
            if (this.pos.y < 0) this.pos.y = p.height
          }

          follow(flowfield: p5.Vector[][]) {
            let x = p.floor(this.pos.x / p.width * cols)
            let y = p.floor(this.pos.y / p.height * rows)
            let index = x + y * cols
            let force = flowfield[y][x]
            this.applyForce(force)
          }
        }

        p.setup = () => {
          const parentRect = canvasRef.current?.getBoundingClientRect()
          if (parentRect) {
            p.createCanvas(parentRect.width, parentRect.height)
          }
          p.colorMode(p.HSB, 255)
          p.background(28)
          initFlowField()
          initParticles()
        }

        p.draw = () => {
          p.background(28, 28, 28, 5)
          updateFlowField()
          
          particles.forEach((particle) => {
            particle.follow(flowField)
            particle.update()
            particle.edges()
            particle.show()
          })
        }

        p.windowResized = () => {
          const parentRect = canvasRef.current?.getBoundingClientRect()
          if (parentRect) {
            p.resizeCanvas(parentRect.width, parentRect.height)
          }
          initFlowField()
          initParticles()
        }

        function initFlowField() {
          flowField = new Array(rows)
          for (let y = 0; y < rows; y++) {
            flowField[y] = new Array(cols)
            for (let x = 0; x < cols; x++) {
              flowField[y][x] = p.createVector(0, 0)
            }
          }
        }

        function updateFlowField() {
          let yoff = 0
          for (let y = 0; y < rows; y++) {
            let xoff = 0
            for (let x = 0; x < cols; x++) {
              let angle = getAngle(x, y)
              let v = p5.Vector.fromAngle(angle)
              v.setMag(0.1)
              flowField[y][x] = v
              xoff += 0.1
            }
            yoff += 0.1
          }
        }

        function getAngle(x: number, y: number) {
          const time = p.frameCount * 0.01 * settingsRef.current.speed / 50
          const scale = 0.1
          
          switch (settingsRef.current.shape) {
            case 'waves':
              return p.noise(x * scale, y * scale, time) * p.TWO_PI
            case 'spiral':
              const dx = x - cols / 2
              const dy = y - rows / 2
              return p.atan2(dy, dx) + time
            case 'vortex':
              const cx = cols / 2
              const cy = rows / 2
              const distanceFromCenter = p.dist(x, y, cx, cy)
              return p.map(distanceFromCenter, 0, p.sqrt(cx * cx + cy * cy), 0, p.TWO_PI * 2) + time
            default:
              return 0
          }
        }

        function initParticles() {
          particles = []
          for (let i = 0; i < settingsRef.current.complexity; i++) {
            particles.push(new Particle())
          }
        }

        p.updateParticles = () => {
          initParticles()
          particles.forEach(particle => {
            particle.color = p.color(settingsRef.current.color)
          })
        }
      }

      const newP5 = new P5(sketch, canvasRef.current)
      setP5Instance(newP5)
    }

    return () => {
      if (p5Instance) {
        p5Instance.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (shouldUpdate && p5Instance && p5Instance.updateParticles) {
      p5Instance.updateParticles()
      onUpdateComplete()
    }
  }, [shouldUpdate, p5Instance, onUpdateComplete])

  return (
    <div ref={canvasRef} className="w-full h-full relative bg-[#1c1c1c]">
      <div className="absolute bottom-4 left-4 text-[#feedbb80] text-xs">
        Generative artwork based on current settings
      </div>
    </div>
  )
}

