import { useMemo } from 'react'

import { parseAsString, useQueryState } from 'nuqs'

import { AddPhraseModal } from '@/components/add-phrase-modal/add-phrase-modal'
import { PhraseItem } from '@/components/phrase-item/phrase-item'
import { PhraseList } from '@/components/phrase-list/phrase-list'
import { Search } from '@/components/search/search'
import { useDebounce } from '@/hooks/use-debounce'
import { usePhrases } from '@/hooks/use-phrases'

export default function App() {
  const [phraseSearch, setPhraseSearch] = useQueryState('phrase', parseAsString.withDefault(''))
  const debouncedPhrase = useDebounce(phraseSearch)

  const { addPhrase, deletePhrase, phrases } = usePhrases()

  const phrasesToIterate = useMemo(() => {
    if (!debouncedPhrase.trim().length) return phrases

    return phrases.filter((phrase) =>
      phrase.content.toLowerCase().includes(debouncedPhrase.toLowerCase()),
    )
  }, [debouncedPhrase, phrases])

  return (
    <main className='mx-auto grid min-h-screen w-[min(1000px,90%)] grid-rows-[auto_1fr] gap-10'>
      <header className='flex flex-col items-center justify-between gap-4 py-4 sm:flex-row'>
        <h1 className='text-xl font-bold'>IT Patagonia</h1>
        <Search onSearchChange={(value) => void setPhraseSearch(value)} value={phraseSearch} />
      </header>
      <div className='w-full space-y-4'>
        <div className='flex justify-end'>
          <AddPhraseModal onSubmit={addPhrase} phrases={phrases} />
        </div>
        <section aria-labelledby='my-phrases-title' className='space-y-4'>
          <h2 className='text-lg font-bold' id='my-phrases-title'>
            Mis frases
          </h2>
          <PhraseList
            phrases={phrasesToIterate}
            renderItem={(phrase) => (
              <PhraseItem key={phrase.id} onDelete={deletePhrase} phrase={phrase} />
            )}
            search={debouncedPhrase}
          />
        </section>
      </div>
    </main>
  )
}
