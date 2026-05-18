import { useMemo, useState } from 'react'
import { getDestinations, searchDestinations } from '../services/destinationService'

export function useDestinationSearch() {
  const destinations = useMemo(() => getDestinations(), [])
  const [query, setQuery] = useState('')

  const results = useMemo(
    () => searchDestinations(query, destinations),
    [query, destinations]
  )

  const firstResultId = results.length > 0 ? results[0].id : ''

  return { destinations, query, setQuery, results, firstResultId }
}
