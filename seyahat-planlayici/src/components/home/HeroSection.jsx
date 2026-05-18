function HeroSection() {
  return (
    <>
      <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-8 border border-indigo-100 text-indigo-600 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        Yeni Nesil Seyahat Planlayıcı
      </div>

      <h1 className="text-6xl md:text-[5rem] font-black tracking-tighter mb-8 leading-[1.1] text-slate-800">
        Özgürce Keşfet, <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-fuchsia-500">
          Kendi Rotanı Kendin Çiz.
        </span>
      </h1>

      <p className="text-xl text-slate-500 font-medium mb-12 max-w-2xl leading-relaxed">
        Hazır tur paketlerine sıkışma. Gideceğin mekanları seç, günlere sürükle ve anlık bütçeni
        takip ederek kendi kusursuz seyahatini adım adım tasarla.
      </p>
    </>
  )
}

export default HeroSection
