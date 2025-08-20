import { type Phrase } from '@/types/phrases'

import { Button } from '../ui/button'
import { Card, CardContent, CardFooter } from '../ui/card'

interface PhraseItemProps {
  onDelete?: (id: string) => void
  phrase: Phrase
}

export function PhraseItem({ onDelete, phrase }: PhraseItemProps) {
  return (
    <Card key={phrase.id}>
      <CardContent className='flex-1'>
        <p className='whitespace-pre-line'>{phrase.content}</p>
      </CardContent>
      {onDelete ? (
        <CardFooter className='justify-end'>
          <Button onClick={() => onDelete(phrase.id)} variant='destructive'>
            Eliminar
          </Button>
        </CardFooter>
      ) : null}
    </Card>
  )
}
