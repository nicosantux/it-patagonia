import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { PhraseList } from '../phrase-list/phrase-list'

import { PhraseItem } from './phrase-item'

describe('<PhraseList />', () => {
  it('should show no results message when no phrases', () => {
    render(<PhraseList phrases={[]} renderItem={() => null} />)
    expect(
      screen.getByText(/no hay frases aún. agrega una frase para empezar./i),
    ).toBeInTheDocument()
  })

  it('should show no search results message if there are phrases but no one matches', () => {
    render(
      <PhraseList
        phrases={[]}
        renderItem={(phrase) => <PhraseItem key={phrase.id} phrase={phrase} />}
        search='hola'
      />,
    )

    expect(screen.getByText(/no hay resultados para la búsqueda\./i)).toBeInTheDocument()
  })

  it('should render items using renderItem', () => {
    render(
      <PhraseList
        phrases={[
          { id: '1', content: 'hola' },
          { id: '2', content: 'chau' },
        ]}
        renderItem={(phrase) => <PhraseItem key={phrase.id} phrase={phrase} />}
      />,
    )

    expect(screen.getByText('hola')).toBeInTheDocument()
    expect(screen.getByText('chau')).toBeInTheDocument()
  })
})
