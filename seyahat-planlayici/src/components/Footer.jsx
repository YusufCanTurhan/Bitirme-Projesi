import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800 relative z-20">
      <div className="max-w-7xl mx-auto px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Marka ve Açıklama */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity w-max">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-fuchsia-500 rounded-full text-white flex items-center justify-center text-sm font-black shadow-lg shadow-indigo-500/30">GM</div>
              <span className="text-2xl font-bold tracking-tight text-white">Gezi<span className="text-fuchsia-500">Mimarı</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
              Hazır tur paketlerine sıkışmayın. Gideceğiniz mekanları seçin, günlere sürükleyin ve kendi kusursuz seyahatinizi adım adım tasarlayın.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h4 className="text-white font-black mb-6 uppercase tracking-widest text-xs">Keşfet</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-fuchsia-400 transition-colors">Tüm Şehirler</Link></li>
              <li><span className="cursor-pointer hover:text-fuchsia-400 transition-colors">Popüler Rotalar</span></li>
              <li><Link to="/nasil-calisir" className="hover:text-fuchsia-400 transition-colors">Nasıl Çalışır?</Link></li>
            </ul>
          </div>

          {/* İletişim & Sosyal */}
          <div>
            <h4 className="text-white font-black mb-6 uppercase tracking-widest text-xs">Bağlantılar</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/hakkimizda" className="hover:text-indigo-400 transition-colors">Hakkımızda</Link></li>
              <li><Link to="/iletisim" className="hover:text-indigo-400 transition-colors">İletişim</Link></li>
              <li><span className="cursor-pointer hover:text-indigo-400 transition-colors">Topluluk</span></li>
            </ul>
          </div>
        </div>

        {/* Alt Çizgi ve Telif */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
          <p>© 2026 Gezi Mimarı. Tüm hakları saklıdır.</p>
          <div className="flex gap-6">
            <Link to="/gizlilik-politikasi" className="cursor-pointer hover:text-white transition-colors">Gizlilik Politikası</Link>
  <Link to="/kullanim-kosullari" className="cursor-pointer hover:text-white transition-colors">Kullanım Koşulları</Link>
          </div>
        </div>
        
      </div>
    </footer>
  )
}

export default Footer