import { useState, useEffect } from 'react'

function App() {
  // Gelen verileri tutacağımız 'state' (durum)
  const [destinations, setDestinations] = useState([])

  // Sayfa yüklendiğinde çalışacak olan kod bloğu
  useEffect(() => {
    // Kendi API'mize (json-server) istek atıyoruz
    fetch('http://localhost:3000/destinations')
      .then(response => response.json()) // Gelen cevabı JSON'a çeviriyoruz
      .then(data => setDestinations(data)) // Veriyi state'e kaydediyoruz
      .catch(error => console.error("Veri çekme hatası:", error))
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Seyahat Bütçesi Planlayıcı</h1>
      <h2>Kayıtlı Rotalar:</h2>
      
      {/* Verileri ekranda listeliyoruz */}
      <ul>
        {destinations.map((dest) => (
          <li key={dest.id} style={{ marginBottom: '10px' }}>
            <strong>{dest.city}, {dest.country}</strong> 
            <br />
            Günlük Yemek Bütçesi: {dest.dailyCosts.food} {dest.currency}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App