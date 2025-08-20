import { type ReactNode } from 'react'

import { type Phrase } from '@/types/phrases'

interface PhraseListProps {
  phrases: Phrase[]
  renderItem: (phrase: Phrase) => ReactNode
  search?: string
}

export function PhraseList({ phrases, renderItem, search }: PhraseListProps) {
  const hasSearch = search ? search.trim().length > 0 : false
  const hasResults = phrases.length > 0

  if (hasSearch && !hasResults) {
    return (
      <p className='mt-10 text-center text-muted-foreground'>No hay resultados para la búsqueda.</p>
    )
  }

  if (!hasResults) {
    return (
      <p className='mt-10 text-center text-muted-foreground'>
        No hay frases aún. Agrega una frase para empezar.
      </p>
    )
  }

  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-4'>
      {phrases.map((phrase) => {
        return renderItem(phrase)
      })}
    </div>
  )
}
