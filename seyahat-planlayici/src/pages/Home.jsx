import { useState } from 'react'
import { Link } from 'react-router-dom'
import appData from '../data.json'

function Home() {
  // YENİ EKLENEN STATE: Arama kutusundaki yazıyı tutacak değişken
  const [aramaMetni, setAramaMetni] = useState('');
  
  const [destinations] = useState(appData.destinations)

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 overflow-hidden relative">
      
      {/* Arkadaki Modern Renk Parıltıları */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-400/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-5%] w-[30rem] h-[30rem] bg-fuchsia-400/20 rounded-full blur-[100px] pointer-events-none"></div>

      {/* 1. Yüzen Header (Floating Navbar) */}
      
      <main className="pt-40 pb-20 px-8 max-w-7xl mx-auto relative z-10">
        
        {/* 2. Hero Section (Sürükle-Bırak Vurgusu) */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-24 mt-8">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-8 border border-indigo-100 text-indigo-600 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span> Yeni Nesil Seyahat Planlayıcı
          </div>
          
          <h1 className="text-6xl md:text-[5rem] font-black tracking-tighter mb-8 leading-[1.1] text-slate-800">
            Özgürce Keşfet, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-fuchsia-500">
              Kendi Rotanı Kendin Çiz.
            </span>
          </h1>
          
          <p className="text-xl text-slate-500 font-medium mb-12 max-w-2xl leading-relaxed">
            Hazır tur paketlerine sıkışma. Gideceğin mekanları seç, günlere sürükle ve anlık bütçeni takip ederek kendi kusursuz seyahatini adım adım tasarla.
          </p>

          {/* Hedef Arama Kutusu (Gerçekçi Kullanım) */}
          <div className="w-full max-w-2xl bg-white p-2.5 rounded-full shadow-[0_20px_50px_rgb(0,0,0,0.08)] border border-slate-100 flex items-center gap-3 relative z-20 group hover:border-indigo-200 transition-colors">
            <div className="bg-indigo-50 p-3 rounded-full text-indigo-500">
              📍
            </div>
            <input 
              type="text" 
              placeholder="Hangi şehri keşfetmek istersin? (Örn: Amsterdam, Prag...)" 
              value={aramaMetni}
              onChange={(e) => setAramaMetni(e.target.value)} 
              className="flex-1 bg-transparent border-none focus:outline-none text-slate-700 font-medium placeholder:text-slate-400 text-sm md:text-base"
              // readOnly YAZISINI SİLDİM, ÇÜNKÜ O YAZMAYA ENGEL OLUR
            />
            <Link to="/planla/1" className="bg-slate-900 text-white px-8 py-3.5 rounded-full text-sm font-bold hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-900/20 whitespace-nowrap">
              Planlamaya Başla
            </Link>
          </div>
        </div>

        {/* 3. Cam Efektli (Glassmorphism) Gerçekçi Özellik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {[
            { icon: "🎛️", title: "Tam Kontrol Sende", desc: "Listeden ilgini çeken müzeleri, restoranları ve aktiviteleri seçerek tamamen kendi zevkine göre bir rota oluştur." },
            { icon: "💸", title: "Dinamik Bütçe Takibi", desc: "Plan yaparken anlık maliyeti gör, bütçeni aşmadan seyahatini optimize et." },
            { icon: "🪄", title: "Sürükle & Bırak", desc: "Fikrini mi değiştirdin? Seçtiğin mekanları günlere sürükleyerek rotanı anında yeniden şekillendir." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:bg-white hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-xl font-black mb-3 text-slate-800">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 4. Asimetrik & Özgün Şehir Galerisi */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-end mb-10">
            <div>
              <h2 className="text-4xl font-black tracking-tight text-slate-800 mb-2">Başlamaya Hazır Mısın?</h2>
              <p className="text-slate-500 font-medium">Popüler destinasyonlarımızdan birini seç ve maceranı şekillendir.</p>
            </div>
            <Link to="/" className="text-indigo-600 font-bold hover:text-fuchsia-500 transition-colors hidden md:block">
              Tüm Şehirleri Gör &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, idx) => (
              <Link to={`/planla/${dest.id}`} key={dest.id} className={`group relative rounded-[2rem] overflow-hidden shadow-md border border-slate-100 block ${idx === 0 ? 'lg:col-span-2 aspect-[21/9] lg:aspect-auto' : 'aspect-[4/3]'}`}>
                <img 
                  src={dest.coverImage || 'https://placehold.co/800x600/e2e8f0/64748b?text=Şehir'} 
                  alt={dest.city} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Özgün Gradyan ve İçerik Yerleşimi */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-between p-6 md:p-8">
                  <div className="flex justify-end">
                    <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-xs font-black px-4 py-1.5 rounded-full shadow-lg">
                      {dest.currency}
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="bg-indigo-500 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest">Kendi Planını Yap</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tight">{dest.city}</h3>
                    <p className="text-slate-300 text-sm font-medium">{dest.country}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>
    </div>
  )
}

export default Home