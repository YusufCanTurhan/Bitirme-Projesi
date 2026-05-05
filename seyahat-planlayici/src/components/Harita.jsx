import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

function Harita({ places, routePlaces, setRotaDetaylari }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  
  // YENİ: Hem tıklanan hem de üzerine gelinen mekanı ayrı ayrı takip ediyoruz
  const [seciliMekan, setSeciliMekan] = useState(null);
  const [hoveredPlace, setHoveredPlace] = useState(null);

  const merkez = places.length > 0 
    ? { lat: places[0].lat, lng: places[0].lng } 
    : { lat: 52.3676, lng: 4.9041 };

  useEffect(() => {
    if (!window.google || routePlaces.length < 2) {
      setDirections(null);
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const origin = { lat: routePlaces[0].lat, lng: routePlaces[0].lng };
    const destination = { lat: routePlaces[routePlaces.length - 1].lat, lng: routePlaces[routePlaces.length - 1].lng };
    
    const waypoints = routePlaces.slice(1, -1).map(place => ({
      location: { lat: place.lat, lng: place.lng },
      stopover: true
    }));

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: window.google.maps.TravelMode.WALKING, 
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          if (setRotaDetaylari) {
            setRotaDetaylari(result.routes[0].legs);
          }
        }
      }
    );
  }, [routePlaces]);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && merkez) {
      map.panTo(merkez);
    }
  }, [merkez, map]);

  if (!isLoaded) return <div className="flex items-center justify-center h-full w-full bg-slate-100 text-slate-500 font-medium">Google Haritası Yükleniyor...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={merkez}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
      }}
    >
      {places.map((place) => (
        <Marker
          key={place.id}
          position={{ lat: place.lat, lng: place.lng }}
          onClick={() => setSeciliMekan(place)}
          // YENİ: Mouse ile üzerine gelme ve çekme olayları
          onMouseOver={() => setHoveredPlace(place)}
          onMouseOut={() => setHoveredPlace(null)}
        />
      ))}

      {/* EFECT BURADA: hoveredPlace varsa InfoWindow açılır ve resim büyütülür */}
      {(hoveredPlace || seciliMekan) && (
        <InfoWindow
    position={{ 
      lat: (hoveredPlace || seciliMekan).lat, 
      lng: (hoveredPlace || seciliMekan).lng 
    }}
    onCloseClick={() => {
      setSeciliMekan(null);
      setHoveredPlace(null);
    }}
    options={{ 
      pixelOffset: new window.google.maps.Size(0, -35),
      // Bu seçenek bazen titremeyi engellemeye yardımcı olur
      disableAutoPan: true 
    }}
  >
    {/* pointer-events-none ekleyerek farenin pencereyi bir 'duvar' gibi görmesini engelliyoruz */}
    <div className="p-0 m-0 overflow-hidden rounded-xl w-64 bg-white shadow-2xl pointer-events-none select-none">
      <div className="relative overflow-hidden h-32">
        <img 
          src={(hoveredPlace || seciliMekan).image} 
          alt={(hoveredPlace || seciliMekan).content} 
          // scale miktarını biraz düşürdük (1.1), geçişi yumuşattık
          className="w-full h-full object-cover transition-transform duration-500 transform scale-110" 
        />
        <div className="absolute top-2 right-2">
          <span className="bg-indigo-600 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">
            {(hoveredPlace || seciliMekan).category}
          </span>
        </div>
      </div>
      
      <div className="p-3 text-left">
        <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight mb-1">
          {(hoveredPlace || seciliMekan).content}
        </h4>
        
        <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 font-medium">
          {(hoveredPlace || seciliMekan).description}
        </p>
      </div>
    </div>
  </InfoWindow>
      )}

      {directions && (
        <DirectionsRenderer 
          directions={directions} 
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: '#4f46e5',
              strokeWeight: 5,
            }
          }}
        />
      )}
    </GoogleMap>
  );
}

export default Harita;