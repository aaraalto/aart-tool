import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ShapeSelectorProps = {
  value: string
  onChange: (value: string) => void
}

export function ShapeSelector({ value, onChange }: ShapeSelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="text-[#feedbb80] uppercase text-xs font-medium tracking-wide">
        Shape
      </Label>
      <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger className="w-full bg-[#00000020] text-[#feedbb] border-0">
          <SelectValue placeholder="Select shape" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="waves">Waves</SelectItem>
          <SelectItem value="spiral">Spiral</SelectItem>
          <SelectItem value="vortex">Vortex</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

