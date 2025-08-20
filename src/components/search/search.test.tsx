import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Search } from './search'

describe('<Search />', () => {
  it('should show the value controlled and placeholder', () => {
    render(<Search onSearchChange={() => undefined} value='hola' />)
    const input = screen.getByLabelText(/buscar una frase/i)

    expect(input).toHaveValue('hola')
    expect(input).toHaveAttribute('placeholder', 'Buscar una frase')
  })

  it('should call onSearchChange when typing', () => {
    const onChange = vi.fn()

    render(<Search onSearchChange={onChange} value='' />)
    const input = screen.getByLabelText(/buscar una frase/i)

    fireEvent.change(input, { target: { value: 'hola' } })
    expect(onChange).toHaveBeenCalledWith('hola')
  })
})
