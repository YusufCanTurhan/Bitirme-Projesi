import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[999] flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
      
      {/* Logo Alanı */}
      <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div className="h-10 w-10 bg-gradient-to-br from-indigo-600 to-fuchsia-500 rounded-full text-white flex items-center justify-center text-sm font-black shadow-lg shadow-indigo-500/30">GM</div>
        <span className="text-xl font-bold tracking-tight text-gray-800">Gezi<span className="text-fuchsia-500">Mimarı</span></span>
      </Link>
      
      {/* Orta Menü Linkleri */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Keşfedin</Link>
        <Link to="/nasil-calisir" className="hover:text-indigo-600 transition-colors">Nasıl Çalışır?</Link>
        <Link to="/hakkimizda" className="hover:text-indigo-600 transition-colors">Hakkımızda</Link>
        <Link to="/iletisim" className="hover:text-indigo-600 transition-colors">İletişim</Link>
      </nav>
      
      {/* Sağ Taraf - Giriş Yap yerine Doğrudan Uygulamaya Yönlendirme */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-bold hidden md:inline text-gray-500">TRY</span>
        <Link to="/planla/1" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-fuchsia-600 transition-colors shadow-lg shadow-slate-900/10">
          Hemen Planla
        </Link>
      </div>
      
    </header>
  )
}

export default Navbar