import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import L from 'leaflet' // Leaflet kütüphanesini ikonlar için çağırıyoruz
import 'leaflet/dist/leaflet.css'

// Harita kamerasını hareket ettiren yardımcı bileşen (Bunu biraz daha havalı yaptık, artık uçarak gidiyor)
function HaritaYoneticisi({ merkez }) {
  const map = useMap()
  useEffect(() => {
    if (merkez) {
      map.flyTo(merkez, 13, { duration: 1.5 }) // setView yerine flyTo kullandık, animasyonlu geçer
    }
  }, [merkez, map])
  return null
}

function Harita({ places, routePlaces }) {
  const varsayilanMerkez = places.length > 0 ? [places[0].lat, places[0].lng] : [52.3676, 4.9041]

  // SİHİRLİ DOKUNUŞ: Her mekan için o mekanın resmini içeren özel yuvarlak bir ikon yapıyoruz
  const getCustomIcon = (imageUrl) => {
    return L.divIcon({
      className: 'bg-transparent border-none', // Leaflet'in varsayılan beyaz arka planını siler
      html: `
        <div style="width: 44px; height: 44px; border-radius: 50%; border: 3px solid #4f46e5; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3); overflow: hidden; background-color: white; transform: translate(-50%, -50%); transition: all 0.3s ease;">
          <img src="${imageUrl}" style="width: 100%; height: 100%; object-fit: cover;" alt="pin" />
        </div>
      `,
      iconSize: [0, 0], // Boyutu div içinden veriyoruz
      popupAnchor: [0, -22] // Popup'ın resmin hemen üstünde açılması için
    })
  }

  return (
    <MapContainer 
      center={varsayilanMerkez} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      <HaritaYoneticisi merkez={varsayilanMerkez} />

      {/* Mekan İşaretçileri (Artık özel resimli ikonlar kullanıyor) */}
      {places.map((place) => (
        <Marker 
          key={place.id} 
          position={[place.lat, place.lng]}
          icon={getCustomIcon(place.image)}
        >
          {/* Tıklayınca açılan küçük pencereyi de güzelleştirdik */}
          <Popup>
            <div style={{ textAlign: 'center', margin: '-5px' }}>
              <img src={place.image} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '4px' }} alt="" />
              <strong style={{ display: 'block', marginTop: '8px', color: '#1e293b' }}>{place.content}</strong>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Rota Çizgisi */}
      {routePlaces.length > 1 && (
        <Polyline 
          positions={routePlaces.map(p => [p.lat, p.lng])} 
          color="#4f46e5" 
          weight={5}
          dashArray="10, 10"
        />
      )}
    </MapContainer>
  )
}

export default Harita