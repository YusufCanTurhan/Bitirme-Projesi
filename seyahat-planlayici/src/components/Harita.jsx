import { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

function Harita({ places, routePlaces, setRotaDetaylari, odaklanilacakMekan, setOdaklanilacakMekan }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [seciliMekan, setSeciliMekan] = useState(null);
  const [hoveredPlace, setHoveredPlace] = useState(null);

  // KRİTİK: Haritanın şu anki merkezini bir state içinde tutuyoruz
  const [haritaMerkezi, setHaritaMerkezi] = useState({ 
    lat: places && places.length > 0 ? places[0].lat : 52.3676, 
    lng: places && places.length > 0 ? places[0].lng : 4.9041 
  });

  // Şehir değiştiğinde (Yeni bir şehre girildiğinde) merkezi güncelle
  useEffect(() => {
    if (places && places.length > 0) {
      const yeniMerkez = { lat: places[0].lat, lng: places[0].lng };
      setHaritaMerkezi(yeniMerkez);
      if (map) map.panTo(yeniMerkez);
    }
  }, [places]); // Sadece şehir/mekan listesi değişirse çalışır

  // 1. DRONE EFEKTİ: Sağdaki listeden mekana tıklandığında oraya uçar
  useEffect(() => {
    if (odaklanilacakMekan && map) {
      const yeniKonum = { lat: odaklanilacakMekan.lat, lng: odaklanilacakMekan.lng };
      
      setSeciliMekan(odaklanilacakMekan); // Bilgi penceresini aç
      setHaritaMerkezi(yeniKonum); // Hafızayı güncelle
      
      map.panTo(yeniKonum); // Oraya yumuşak geçiş yap
      map.setZoom(16); // Yakınlaş
    }
  }, [odaklanilacakMekan, map]);

  // Rota Çizimi
  useEffect(() => {
    if (!window.google || !routePlaces || routePlaces.length < 2) {
      setDirections(null);
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: { lat: routePlaces[0].lat, lng: routePlaces[0].lng },
        destination: { lat: routePlaces[routePlaces.length - 1].lat, lng: routePlaces[routePlaces.length - 1].lng },
        waypoints: routePlaces.slice(1, -1).map(p => ({ location: { lat: p.lat, lng: p.lng }, stopover: true })),
        travelMode: window.google.maps.TravelMode.WALKING, 
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
          if (setRotaDetaylari) setRotaDetaylari(result.routes[0].legs);
        }
      }
    );
  }, [routePlaces]);

  const onLoad = useCallback((map) => { setMap(map); }, []);
  const onUnmount = useCallback(() => { setMap(null); }, []);

  if (!isLoaded) return <div className="h-full w-full bg-slate-100 flex items-center justify-center">Harita Yükleniyor...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={haritaMerkezi} // Sabit değer değil, state veriyoruz
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      // Kullanıcı haritayı sürüklediğinde hafızayı güncellemiyoruz ki kilitlenmesin
      onDragEnd={() => {
        if (map) {
          const newCenter = map.getCenter();
          setHaritaMerkezi({ lat: newCenter.lat(), lng: newCenter.lng() });
        }
      }}
      options={{ mapTypeControl: false, streetViewControl: false }}
    >
      {places && places.map((place) => (
        <Marker
          key={place.id}
          position={{ lat: place.lat, lng: place.lng }}
          onClick={() => {
            setSeciliMekan(place);
            if (setOdaklanilacakMekan) setOdaklanilacakMekan(place);
          }}
          onMouseOver={() => setHoveredPlace(place)}
          onMouseOut={() => setHoveredPlace(null)}
        />
      ))}

      {(hoveredPlace || seciliMekan) && (
        <InfoWindow
          position={{ lat: (hoveredPlace || seciliMekan).lat, lng: (hoveredPlace || seciliMekan).lng }}
          onCloseClick={() => {
            setSeciliMekan(null);
            if (setOdaklanilacakMekan) setOdaklanilacakMekan(null);
          }}
          options={{ pixelOffset: new window.google.maps.Size(0, -35) }}
        >
          <div className="w-64 bg-white overflow-hidden rounded-xl">
             <img src={(hoveredPlace || seciliMekan).image} className="w-full h-32 object-cover" />
             <div className="p-3">
                <h4 className="font-bold text-sm">{(hoveredPlace || seciliMekan).content}</h4>
                <p className="text-[11px] text-gray-500 mt-1">{(hoveredPlace || seciliMekan).description}</p>
             </div>
          </div>
        </InfoWindow>
      )}

      {directions && (
        <DirectionsRenderer 
          directions={directions} 
          options={{ suppressMarkers: true, polylineOptions: { strokeColor: '#4f46e5', strokeWeight: 5 } }}
        />
      )}
    </GoogleMap>
  );
}

export default Harita;