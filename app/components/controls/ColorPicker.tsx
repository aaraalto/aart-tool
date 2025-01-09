import { useState, useRef, useEffect } from 'react'
import { Label } from "@/components/ui/label"
import dynamic from 'next/dynamic'

const HexColorPicker = dynamic(() => import('react-colorful').then((mod) => mod.HexColorPicker), { ssr: false })

type ColorPickerProps = {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const colorPickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="space-y-2">
      <Label className="text-[#feedbb80] uppercase text-xs font-medium tracking-wide">
        Color
      </Label>
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 rounded-lg transition-all ring-2 ring-white hover:ring-opacity-50"
          style={{ backgroundColor: color }}
          onClick={() => setShowColorPicker(!showColorPicker)}
        />
        <span className="text-xs text-[#feedbb]">{color}</span>
      </div>
      {showColorPicker && (
        <div ref={colorPickerRef} className="mt-2">
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  )
}

