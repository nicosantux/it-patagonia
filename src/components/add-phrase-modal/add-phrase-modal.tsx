import { type FormEvent, useState } from 'react'

import { Plus } from 'lucide-react'

import { cn } from '@/lib/utils'
import { type Phrase } from '@/types/phrases'

import { Button } from '../ui/button'
import {
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Dialog,
} from '../ui/dialog'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

interface AddPhraseModalProps {
  onSubmit: (phrase: string) => void
  phrases: Phrase[]
}

export function AddPhraseModal({ onSubmit, phrases }: AddPhraseModalProps) {
  const [error, setError] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = (open: boolean) => {
    if (!open) setError('')

    setIsOpen(open)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const phrase = formData.get('phrase')?.toString() ?? ''

    if (!phrase.trim().length) {
      setError('La frase no puede estar vacía')

      return
    }

    const existingPhrase = phrases.find((p) => p.content.toLowerCase() === phrase.toLowerCase())

    if (existingPhrase) {
      setError('La frase ya existe')

      return
    }

    onSubmit(phrase)
    setError('')
    setIsOpen(false)
  }

  return (
    <Dialog onOpenChange={handleOpen} open={isOpen}>
      <DialogTrigger asChild className='ml-auto'>
        <Button>
          Nueva Frase <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-lg font-bold'>Nueva frase</DialogTitle>
        </DialogHeader>
        <DialogDescription className='text-pretty'>
          Agrega una frase a tu lista. Una vez que termines haz clic en el botón Agregar.
        </DialogDescription>
        <form id='add-phrase' onSubmit={handleSubmit}>
          <Label className='sr-only' htmlFor='phrase-textarea'>
            Ingresa la frase
          </Label>
          <Textarea
            aria-errormessage={error ? 'phrase-error' : undefined}
            aria-invalid={Boolean(error)}
            className={cn(error && 'border-destructive')}
            id='phrase-textarea'
            name='phrase'
            placeholder='Escribe aquí la frase'
          />
          {error ? (
            <p
              aria-live='polite'
              className='mt-2 text-sm text-destructive'
              id='phrase-error'
              role='status'
            >
              {error}
            </p>
          ) : null}
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button className='bg-accent' type='submit' variant='outline'>
              Cancelar
            </Button>
          </DialogClose>
          <Button form='add-phrase' type='submit'>
            Agregar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
