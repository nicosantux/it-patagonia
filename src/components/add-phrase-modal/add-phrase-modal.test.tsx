import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { type Phrase } from '@/types/phrases'

import { AddPhraseModal } from './add-phrase-modal'

const mockPhrases: Phrase[] = [{ id: '1', content: 'hola' }]

const mockOnSubmit = vi.fn()

describe('AddPhraseModal', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear()
    render(<AddPhraseModal onSubmit={mockOnSubmit} phrases={mockPhrases} />)
  })

  it('should add a valid phrase correctly', async () => {
    const user = userEvent.setup()

    // Open modal
    await user.click(screen.getByRole('button', { name: /nueva frase/i }))

    // Type in textarea
    const textarea = screen.getByLabelText(/ingresa la frase/i)

    await user.type(textarea, 'New test phrase')

    // Click Add button
    const addButton = screen.getByRole('button', { name: /agregar/i })

    await user.click(addButton)

    // Verify onSubmit was called with correct phrase
    expect(mockOnSubmit).toHaveBeenCalledWith('New test phrase')
    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
  })

  it('should show error when phrase is empty', async () => {
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /nueva frase/i }))

    // Try to add without typing anything
    const addButton = screen.getByRole('button', { name: /agregar/i })

    await user.click(addButton)

    expect(screen.getByText(/la frase no puede estar vacía/i)).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('should show error when phrase already exists', async () => {
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /nueva frase/i }))

    // Type a phrase that already exists (case insensitive)
    const textarea = screen.getByLabelText(/ingresa la frase/i)

    await user.type(textarea, 'hola')

    const addButton = screen.getByRole('button', { name: /agregar/i })

    await user.click(addButton)

    expect(screen.getByText(/la frase ya existe/i)).toBeInTheDocument()
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('should clear error when closing and reopening modal', async () => {
    const user = userEvent.setup()

    // Open modal and generate error
    await user.click(screen.getByRole('button', { name: /nueva frase/i }))
    await user.click(screen.getByRole('button', { name: /agregar/i }))
    expect(screen.getByText(/La frase no puede estar vacía/i)).toBeInTheDocument()

    // Close modal
    await user.click(screen.getByRole('button', { name: /cancelar/i }))

    // Reopen modal
    await user.click(screen.getByRole('button', { name: /nueva frase/i }))

    // Error should not be present
    expect(screen.queryByText(/La frase no puede estar vacía/i)).not.toBeInTheDocument()
  })

  it('should close modal after successfully adding a phrase', async () => {
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /nueva frase/i }))

    const textarea = screen.getByLabelText(/ingresa la frase/i)

    await user.type(textarea, 'New phrase')

    await user.click(screen.getByRole('button', { name: /agregar/i }))

    // Modal should close
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('should have correct accessibility properties', async () => {
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /nueva frase/i }))
    const textarea = screen.getByLabelText(/ingresa la frase/i)

    // Verify initial accessibility attributes
    expect(textarea).toHaveAttribute('aria-invalid', 'false')
    expect(textarea).not.toHaveAttribute('aria-errormessage')

    // Generate error and verify attributes
    await user.click(screen.getByRole('button', { name: /agregar/i }))
    const errorMessage = screen.getByRole('status')

    expect(textarea).toHaveAttribute('aria-invalid', 'true')
    expect(textarea).toHaveAttribute('aria-errormessage', 'phrase-error')
    expect(errorMessage).toHaveAttribute('aria-live', 'polite')
    expect(errorMessage).toHaveAttribute('id', 'phrase-error')
  })
})
