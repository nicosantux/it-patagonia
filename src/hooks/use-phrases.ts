import { useCallback, useState } from 'react'

import { type Phrase } from '@/types/phrases'

export function usePhrases() {
  const [phrases, setPhrases] = useState<Phrase[]>(() => {
    const phrases = JSON.parse(localStorage.getItem('phrases') ?? '[]') as unknown

    if (!Array.isArray(phrases)) return []

    return phrases as Phrase[]
  })

  const addPhrase = useCallback(
    (phrase: string) => {
      const newPhrases = phrases.concat({ id: crypto.randomUUID(), content: phrase })

      setPhrases(newPhrases)
      window.localStorage.setItem('phrases', JSON.stringify(newPhrases))
    },
    [phrases],
  )

  const deletePhrase = useCallback(
    (id: string) => {
      const newPhrases = phrases.filter((p) => p.id !== id)

      setPhrases(newPhrases)
      window.localStorage.setItem('phrases', JSON.stringify(newPhrases))
    },
    [phrases],
  )

  return { addPhrase, deletePhrase, phrases }
}
