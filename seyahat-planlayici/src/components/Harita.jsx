import { useState, useEffect, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api'
import { useDirections } from '../hooks/useDirections'
import { useMapCenter } from '../hooks/useMapCenter'
import PlaceInfoWindow from './map/PlaceInfoWindow'

const containerStyle = { width: '100%', height: '100%' }

function Harita({ places, routePlaces, setRotaDetaylari, odaklanilacakMekan, setOdaklanilacakMekan }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  })

  const [map, setMap] = useState(null)
  const [seciliMekan, setSeciliMekan] = useState(null)
  const [hoveredPlace, setHoveredPlace] = useState(null)

  const { center, syncCenterFromMap } = useMapCenter(places, map, odaklanilacakMekan)
  const directions = useDirections(routePlaces, setRotaDetaylari)

  useEffect(() => {
    if (odaklanilacakMekan) {
      setSeciliMekan(odaklanilacakMekan)
    }
  }, [odaklanilacakMekan])

  const onLoad = useCallback((mapInstance) => setMap(mapInstance), [])
  const onUnmount = useCallback(() => setMap(null), [])

  const handleMarkerClick = (place) => {
    setSeciliMekan(place)
    setOdaklanilacakMekan?.(place)
  }

  const handleInfoClose = () => {
    setSeciliMekan(null)
    setOdaklanilacakMekan?.(null)
  }

  const infoPlace = hoveredPlace || seciliMekan

  if (!isLoaded) {
    return <div className="h-full w-full bg-slate-100 flex items-center justify-center">Harita Yükleniyor...</div>
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onDragEnd={() => map && syncCenterFromMap(map)}
      options={{ mapTypeControl: false, streetViewControl: false }}
    >
      {places?.map((place) => (
        <Marker
          key={place.id}
          position={{ lat: place.lat, lng: place.lng }}
          onClick={() => handleMarkerClick(place)}
          onMouseOver={() => setHoveredPlace(place)}
          onMouseOut={() => setHoveredPlace(null)}
        />
      ))}

      {infoPlace && <PlaceInfoWindow place={infoPlace} onClose={handleInfoClose} />}

      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: true,
            polylineOptions: { strokeColor: '#4f46e5', strokeWeight: 5 },
          }}
        />
      )}
    </GoogleMap>
  )
}

export default Harita
