import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Planla from './pages/Planla'
import Hakkimizda from './pages/Hakkimizda'
import NasilCalisir from './pages/NasilCalisir'
import Iletisim from './pages/Iletisim'
import GizlilikPolitikasi from './pages/GizlilikPolitikasi'
import KullanimKosullari from './pages/KullanimKosullari'
import { useAppData } from './hooks/useAppData'
function App() {
  const location = useLocation()
  const { ready } = useAppData()
  const isPlanningPage = location.pathname.startsWith('/planla')

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-3 font-sans">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-sm font-bold text-slate-500">Gezi Mimarı yükleniyor…</p>
      </div>
    )
  }

  return (
    <>
      {!isPlanningPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planla/:id" element={<Planla />} />
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="/nasil-calisir" element={<NasilCalisir />} />
        <Route path="/iletisim" element={<Iletisim />} />
        <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasi />} />
        <Route path="/kullanim-kosullari" element={<KullanimKosullari />} />
      </Routes>

      {!isPlanningPage && <Footer />}
    </>
  )
}

export default App
