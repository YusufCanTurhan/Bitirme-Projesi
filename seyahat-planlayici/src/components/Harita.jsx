import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

// Gezi Mimarı Özel İkonu
const placeIcon = L.divIcon({
  className: 'bg-transparent',
  html: `<div class="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-[0_0_15px_rgba(79,70,229,0.5)] border-2 border-white transform transition-transform hover:scale-110">📍</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Canlı Konum İkonu
const userIcon = L.divIcon({
  className: 'bg-transparent',
  html: `<div class="relative flex h-6 w-6">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-6 w-6 bg-blue-600 border-2 border-white shadow-md"></span>
        </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// YENİ: routePlaces prop'u eklendi
function Harita({ places, routePlaces = [], cityCenter = [52.3676, 4.9041] }) {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => console.log("Konum alınamadı:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // YENİ: Günlük plana eklenen mekanların koordinatlarını sırayla alır
  const polylinePositions = routePlaces
    .filter(place => place.lat && place.lng)
    .map(place => [place.lat, place.lng]);

  return (
    <div className="w-full h-full min-h-[500px] rounded-[2rem] overflow-hidden bg-slate-100 relative z-0">
      <MapContainer center={cityCenter} zoom={13} className="w-full h-full" zoomControl={false}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap'
        />

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup><span className="font-bold">Şu an buradasınız!</span></Popup>
          </Marker>
        )}

        {/* YENİ: Gidilecek Yol Çizgisi (Mekanlar eklendikçe uzar) */}
        {polylinePositions.length > 1 && (
          <Polyline 
            positions={polylinePositions} 
            color="#D946EF" // Fuşya Rengi
            weight={4} 
            dashArray="10, 10" 
            className="animate-pulse"
          />
        )}

        {places.map((place) => (
          place.lat && place.lng && (
            <Marker key={place.id} position={[place.lat, place.lng]} icon={placeIcon}>
              <Popup className="rounded-xl min-w-[200px]">
                <div className="p-1">
                  <img src={place.image} alt={place.content} className="w-full h-24 object-cover rounded-lg mb-2" />
                  <h3 className="font-black text-slate-800">{place.content}</h3>
                  <div className="text-xs font-bold text-indigo-600 mt-1">Tahmini: {place.cost} €</div>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}

export default Harita;