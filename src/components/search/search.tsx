import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface SearchProps {
  onSearchChange: (value: string) => void
  value: string
}

export function Search({ onSearchChange, value }: SearchProps) {
  return (
    <div className='w-[min(320px,100%)]'>
      <Label className='sr-only' htmlFor='search-input'>
        Buscar una frase
      </Label>
      <Input
        id='search-input'
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder='Buscar una frase'
        value={value}
      />
    </div>
  )
}
