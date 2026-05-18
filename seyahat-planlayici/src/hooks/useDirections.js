import { useEffect, useState } from 'react'

export function useDirections(routePlaces, onLegsUpdate) {
  const [directions, setDirections] = useState(null)

  useEffect(() => {
    if (!window.google?.maps || !routePlaces || routePlaces.length < 2) {
      setDirections(null)
      onLegsUpdate?.([])
      return
    }

    const directionsService = new window.google.maps.DirectionsService()
    directionsService.route(
      {
        origin: { lat: routePlaces[0].lat, lng: routePlaces[0].lng },
        destination: {
          lat: routePlaces[routePlaces.length - 1].lat,
          lng: routePlaces[routePlaces.length - 1].lng,
        },
        waypoints: routePlaces.slice(1, -1).map((p) => ({
          location: { lat: p.lat, lng: p.lng },
          stopover: true,
        })),
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result)
          onLegsUpdate?.(result.routes[0].legs)
        } else {
          setDirections(null)
          onLegsUpdate?.([])
        }
      }
    )
  }, [routePlaces, onLegsUpdate])

  return directions
}
