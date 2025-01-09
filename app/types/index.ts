export type Settings = {
  complexity: number
  speed: number
  color: string
  aiEnabled: boolean
  shape: string
  particleSize: number
  trailLength: number
}

export type Point = {
  x: number
  y: number
}

export type Particle = {
  position: Point
  velocity: Point
  angle: number
  color: string
}

export type ArtworkConfig = {
  width: number
  height: number
  particleCount: number
  speed: number
  color: string
  shape: string
  particleSize: number
  trailLength: number
}

