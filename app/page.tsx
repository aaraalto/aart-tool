'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import ControlPanel from './components/ControlPanel'
import { Settings } from './types'

const ArtGenCanvas = dynamic(() => import('./components/ArtGenCanvas'), { ssr: false })

// Simulated tiny LLM function
async function tinyLLM(prompt: string): Promise<string> {
  const responses = [
    "Try increasing the complexity for a more intricate pattern.",
    "Experiment with different shapes to create unique visual effects.",
    "Adjust the color to create interesting contrasts with your drawings.",
    "Increase the particle size to create bolder lines and points.",
    "Reduce the trail length for a more minimalist aesthetic.",
  ]
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
  return responses[Math.floor(Math.random() * responses.length)]
}

export default function GenerativeArtTool() {
  const [settings, setSettings] = useState<Settings>({
    complexity: 50,
    speed: 50,
    color: '#feedbb',
    aiEnabled: false,
    shape: 'waves',
    particleSize: 2,
    trailLength: 50,
  })
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null)
  const [shouldUpdateCanvas, setShouldUpdateCanvas] = useState(false)

  useEffect(() => {
    if (settings.aiEnabled) {
      tinyLLM("Suggest an improvement for the current art configuration")
        .then(suggestion => setAiSuggestion(suggestion))
    } else {
      setAiSuggestion(null)
    }
  }, [settings.aiEnabled])

  const applyChanges = useCallback(() => {
    setShouldUpdateCanvas(true)
  }, [])

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#1c1c1c] p-4 gap-4 overflow-hidden">
      <ControlPanel settings={settings} setSettings={setSettings} applyChanges={applyChanges} />
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 rounded-2xl overflow-hidden border border-[#ffffff10] bg-[#1c1c1c]">
          <ArtGenCanvas 
            settings={settings} 
            shouldUpdate={shouldUpdateCanvas} 
            onUpdateComplete={() => setShouldUpdateCanvas(false)} 
          />
        </div>
        {aiSuggestion && (
          <div className="mt-4 p-4 bg-[#feedbb] text-[#1c1c1c] rounded-lg">
            <h3 className="font-bold mb-2">AI Suggestion:</h3>
            <p>{aiSuggestion}</p>
          </div>
        )}
      </div>
    </div>
  )
}

