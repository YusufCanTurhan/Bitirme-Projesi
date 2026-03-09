import { useParams, Link } from 'react-router-dom'

function Planla() {
  // URL'deki (örneğin /planla/1) "1" rakamını alır
  const { id } = useParams() 

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <Link to="/" className="text-blue-600 font-semibold hover:underline mb-6 inline-block">
          &larr; Ana Sayfaya Dön
        </Link>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Harika bir rota planlıyoruz! 
          </h1>
          <p className="text-gray-600 text-lg">
            Seçtiğin şehrin ID numarası: <strong className="text-blue-600">{id}</strong>
          </p>
          <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 text-center">
            Sürükle-bırak rota planlayıcı ve detaylı bütçe grafikleri bu alana gelecek.
          </div>
        </div>

      </div>
    </div>
  )
}

export default Planla