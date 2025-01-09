import { Slider as UISlider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

type SliderProps = {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
}

export function Slider({ label, value, onChange, min, max, step }: SliderProps) {
  return (
    <div className="space-y-2">
      <Label className="text-[#feedbb80] uppercase text-xs font-medium tracking-wide">
        {label}
      </Label>
      <div className="flex items-center gap-4">
        <UISlider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          min={min}
          max={max}
          step={step}
          className="flex-grow"
        />
        <span className="text-xs text-[#feedbb] w-8 text-right">{value}</span>
      </div>
    </div>
  )
}

