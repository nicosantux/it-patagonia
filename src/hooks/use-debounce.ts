import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timeoutID)
    }
  }, [value, delay])

  return debouncedValue
}
