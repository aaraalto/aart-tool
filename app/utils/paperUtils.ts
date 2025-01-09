import paper from 'paper'

export function initializePaper(canvas: HTMLCanvasElement) {
  paper.setup(canvas)
}

export function drawArt(settings: { complexity: number; speed: number; color: string }) {
  paper.project.clear()

  const { complexity, speed, color } = settings
  const numPoints = Math.floor(complexity / 2) + 5
  const path = new paper.Path()
  path.strokeColor = new paper.Color(color)
  path.strokeWidth = 2

  for (let i = 0; i < numPoints; i++) {
    const point = paper.Point.random().multiply(paper.view.size)
    path.add(point)
  }

  path.smooth()

  let time = 0
  paper.view.onFrame = (event: paper.Event) => {
    time += event.delta * speed * 0.01

    for (let i = 0; i < numPoints; i++) {
      const segment = path.segments[i]
      const sinus = Math.sin(time + i * 0.5) * 10
      const cosinus = Math.cos(time + i * 0.5) * 10
      segment.point.y += sinus
      segment.point.x += cosinus
    }

    path.smooth()
  }
}

