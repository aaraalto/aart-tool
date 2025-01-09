type Point = {
  x: number
  y: number
}

type Particle = {
  position: Point
  velocity: Point
  angle: number
  color: string
}

type ArtworkConfig = {
  width: number
  height: number
  particleCount: number
  speed: number
  color: string
  shape: string
  particleSize: number
  trailLength: number
}

export function createArtwork(config: ArtworkConfig) {
  const particles: Particle[] = []

  // Initialize particles
  for (let i = 0; i < config.particleCount; i++) {
    particles.push({
      position: {
        x: Math.random() * config.width,
        y: Math.random() * config.height
      },
      velocity: {
        x: 0,
        y: 0
      },
      angle: Math.random() * Math.PI * 2,
      color: config.color
    })
  }

  function update(deltaTime: number) {
    const timeScale = deltaTime * 0.001 * config.speed

    particles.forEach(particle => {
      // Update particle based on shape
      switch (config.shape) {
        case 'waves':
          particle.angle += Math.sin(particle.position.x * 0.01 + timeScale) * 0.1
          break
        case 'spiral':
          particle.angle += 0.1 * timeScale
          break
        case 'vortex':
          const dx = particle.position.x - config.width / 2
          const dy = particle.position.y - config.height / 2
          const distance = Math.sqrt(dx * dx + dy * dy)
          particle.angle += (1 - distance / Math.sqrt(config.width * config.width + config.height * config.height)) * timeScale
          break
      }

      // Update velocity and position
      particle.velocity.x = Math.cos(particle.angle) * 2 * config.speed
      particle.velocity.y = Math.sin(particle.angle) * 2 * config.speed
      
      particle.position.x += particle.velocity.x
      particle.position.y += particle.velocity.y

      // Wrap around edges
      if (particle.position.x < 0) particle.position.x = config.width
      if (particle.position.x > config.width) particle.position.x = 0
      if (particle.position.y < 0) particle.position.y = config.height
      if (particle.position.y > config.height) particle.position.y = 0
    })
  }

  function draw(ctx: CanvasRenderingContext2D) {
    particles.forEach(particle => {
      ctx.strokeStyle = particle.color
      ctx.lineWidth = config.particleSize
      ctx.beginPath()
      ctx.moveTo(
        particle.position.x - particle.velocity.x,
        particle.position.y - particle.velocity.y
      )
      ctx.lineTo(
        particle.position.x,
        particle.position.y
      )
      ctx.stroke()
    })
  }

  return {
    update,
    draw
  }
}

