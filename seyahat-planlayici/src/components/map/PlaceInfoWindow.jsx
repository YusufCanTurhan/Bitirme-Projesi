import { InfoWindow } from '@react-google-maps/api'

function PlaceInfoWindow({ place, onClose }) {
  if (!place) return null

  return (
    <InfoWindow
      position={{ lat: place.lat, lng: place.lng }}
      onCloseClick={onClose}
      options={{ pixelOffset: new window.google.maps.Size(0, -35) }}
    >
      <div className="w-64 bg-white overflow-hidden rounded-xl">
        <img src={place.image} className="w-full h-32 object-cover" alt="" />
        <div className="p-3">
          <h4 className="font-bold text-sm">{place.content}</h4>
          <p className="text-[11px] text-gray-500 mt-1">{place.description}</p>
        </div>
      </div>
    </InfoWindow>
  )
}

export default PlaceInfoWindow
