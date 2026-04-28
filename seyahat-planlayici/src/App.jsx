import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Planla from './pages/Planla';
import Hakkimizda from './pages/Hakkimizda';
import NasilCalisir from './pages/NasilCalisir';
import Iletisim from './pages/Iletisim';
import GizlilikPolitikasi from './pages/GizlilikPolitikasi';
import KullanimKosullari from './pages/KullanimKosullari';

function App() {
  const location = useLocation();
  
  // Navbar ve Footer'ın gizleneceği sayfa kontrolü
  // Sadece URL "/planla" ile başlıyorsa bu sayfalar gizlenir
  const isPlanningPage = location.pathname.startsWith('/planla');

  return (
    <>
      {/* Navbar Kontrolü */}
      {!isPlanningPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planla/:id" element={<Planla />} />
        
        {/* Diğer Sayfaların Rotaları - Bunlar eksikse sayfa açılmaz */}
        <Route path="/hakkimizda" element={<Hakkimizda />} />
        <Route path="/nasil-calisir" element={<NasilCalisir />} />
        <Route path="/iletisim" element={<Iletisim />} />
        <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasi />} />
        <Route path="/kullanim-kosullari" element={<KullanimKosullari />} />
      </Routes>

      {/* Footer Kontrolü */}
      {!isPlanningPage && <Footer />}
    </>
  );
}

export default App;