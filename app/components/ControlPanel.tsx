'use client'

import { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "./controls/Slider"
import { ShapeSelector } from "./controls/ShapeSelector"
import { ColorPicker } from "./controls/ColorPicker"
import { Settings } from "../types"

type ControlPanelProps = {
  settings: Settings
  setSettings: React.Dispatch<React.SetStateAction<Settings>>
  applyChanges: () => void
}

export default function ControlPanel({ settings, setSettings, applyChanges }: ControlPanelProps) {
  const [localSettings, setLocalSettings] = useState(settings)

  const handleApplyChanges = () => {
    setSettings(localSettings)
    applyChanges()
  }

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="w-full md:w-80 flex flex-col h-full md:h-auto rounded-2xl control-panel noise overflow-hidden">
      <div className="px-6 py-6 flex-grow overflow-y-auto space-y-8">
        <h2 className="font-mono text-3xl font-bold tracking-tight text-[#feedbb] mb-1">a0</h2>
        <p className="font-mono text-xs mb-8 text-[#feedbb80]">a generative art tool by @aaraalto</p>
        
        <div className="space-y-8">
          <ShapeSelector value={localSettings.shape} onChange={(value) => updateSetting('shape', value)} />
          <Slider label="Complexity" value={localSettings.complexity} onChange={(value) => updateSetting('complexity', value)} min={0} max={200} step={1} />
          <Slider label="Speed" value={localSettings.speed} onChange={(value) => updateSetting('speed', value)} min={0} max={100} step={1} />
          <Slider label="Particle Size" value={localSettings.particleSize} onChange={(value) => updateSetting('particleSize', value)} min={1} max={10} step={1} />
          <Slider label="Trail Length" value={localSettings.trailLength} onChange={(value) => updateSetting('trailLength', value)} min={0} max={100} step={1} />
          <ColorPicker color={localSettings.color} onChange={(color) => updateSetting('color', color)} />

          <div className="flex items-center gap-2">
            <Switch
              checked={localSettings.aiEnabled}
              onCheckedChange={(checked) => updateSetting('aiEnabled', checked)}
              className="data-[state=checked]:bg-[#feedbb] data-[state=unchecked]:bg-[#00000020]"
            />
            <Label className="text-[#feedbb80] uppercase text-xs font-medium tracking-wide cursor-pointer">
              AI Collaboration
            </Label>
          </div>

          <Button 
            onClick={handleApplyChanges}
            className="w-full bg-[#feedbb] text-[#1c1c1c] hover:bg-[#feedbb] hover:brightness-90"
          >
            Apply Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

