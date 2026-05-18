import { useEffect, useState } from 'react'

const FALLBACK_CENTER = { lat: 52.3676, lng: 4.9041 }

function getCenterFromPlaces(places) {
  if (places?.length > 0) {
    return { lat: places[0].lat, lng: places[0].lng }
  }
  return FALLBACK_CENTER
}

export function useMapCenter(places, map, focusedPlace) {
  const [center, setCenter] = useState(() => getCenterFromPlaces(places))

  useEffect(() => {
    if (!places?.length) return
    const next = getCenterFromPlaces(places)
    setCenter(next)
    map?.panTo(next)
  }, [places, map])

  useEffect(() => {
    if (!focusedPlace || !map) return
    const next = { lat: focusedPlace.lat, lng: focusedPlace.lng }
    setCenter(next)
    map.panTo(next)
    map.setZoom(16)
  }, [focusedPlace, map])

  const syncCenterFromMap = (mapInstance) => {
    const mapCenter = mapInstance.getCenter()
    setCenter({ lat: mapCenter.lat(), lng: mapCenter.lng() })
  }

  return { center, syncCenterFromMap }
}
