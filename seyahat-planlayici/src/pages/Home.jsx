import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [destinations, setDestinations] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/destinations')
      .then(response => response.json())
      .then(data => setDestinations(data))
      .catch(error => console.error("Veri çekme hatası:", error))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center tracking-tight">
          ✈️ Seyahat Bütçesi Planlayıcı
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
              
              <div className="bg-blue-600 p-6 text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">{dest.city}</h2>
                  <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {dest.country}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4 text-gray-600 flex-grow">
                <p className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="flex items-center gap-2">🍽️ Yemek</span> 
                  <span className="font-semibold text-gray-800">{dest.dailyCosts.food} {dest.currency}</span>
                </p>
                <p className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="flex items-center gap-2">🚌 Ulaşım</span> 
                  <span className="font-semibold text-gray-800">{dest.dailyCosts.transport} {dest.currency}</span>
                </p>
                <p className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="flex items-center gap-2">☕ Kahve</span> 
                  <span className="font-semibold text-gray-800">{dest.dailyCosts.coffee} {dest.currency}</span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="flex items-center gap-2">🏛️ Müzeler</span> 
                  <span className="font-semibold text-gray-800">{dest.dailyCosts.museums} {dest.currency}</span>
                </p>
              </div>
              
              <div className="p-6 pt-0 mt-auto">
                {/* İŞTE BURASI DEĞİŞTİ: Tıklanan şehrin ID'sine göre yeni sayfaya yönlendiriyor */}
                <Link to={`/planla/${dest.id}`} className="block w-full text-center bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-3 px-4 rounded-xl transition-colors">
                  Planlamaya Başla
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home