import { useEffect, useState } from 'react'
import { loadFromApi } from '../services/destinationService'

export function useAppData() {
  const [ready, setReady] = useState(false)
  const [fromApi, setFromApi] = useState(false)

  useEffect(() => {
    let cancelled = false

    loadFromApi().then(() => {
      if (!cancelled) {
        setReady(true)
        setFromApi(true)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return { ready, fromApi }
}
