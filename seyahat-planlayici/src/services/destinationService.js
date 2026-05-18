import fallbackData from '../data.json'

let appData = {
  destinations: [...fallbackData.destinations],
  places: [...fallbackData.places],
}

let loadPromise = null
let dataSource = 'fallback'

export async function loadFromApi() {
  if (loadPromise) return loadPromise

  loadPromise = (async () => {
    try {
      const [destRes, placesRes] = await Promise.all([
        fetch('/api/destinations'),
        fetch('/api/places'),
      ])

      if (destRes.ok && placesRes.ok) {
        const destinations = await destRes.json()
        const places = await placesRes.json()
        if (Array.isArray(destinations) && Array.isArray(places)) {
          appData = { destinations, places }
          dataSource = 'api'
          return
        }
      }
    } catch {
      /* fallback */
    }
    appData = {
      destinations: [...fallbackData.destinations],
      places: [...fallbackData.places],
    }
    dataSource = 'fallback'
  })()

  return loadPromise
}

export function getDestinations() {
  return appData.destinations
}

export function getDestinationById(id) {
  return appData.destinations.find((d) => d.id === id) ?? null
}

export function getPlacesByDestinationId(destinationId) {
  return appData.places.filter((p) => p.destinationId === destinationId)
}

export function getDefaultDestinationId() {
  return appData.destinations[0]?.id ?? ''
}

export function searchDestinations(query, destinations = getDestinations()) {
  const aranan = query.trim().toLocaleLowerCase('tr-TR')
  if (!aranan) return []

  return destinations.filter((dest) => {
    const sehirAdi = dest.city ? dest.city.toLocaleLowerCase('tr-TR') : ''
    const ulkeAdi = dest.country ? dest.country.toLocaleLowerCase('tr-TR') : ''
    return sehirAdi.includes(aranan) || ulkeAdi.includes(aranan)
  })
}

export function isUsingApiData() {
  return dataSource === 'api'
}
