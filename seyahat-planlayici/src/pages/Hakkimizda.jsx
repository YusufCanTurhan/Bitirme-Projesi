function Hakkimizda() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 relative overflow-hidden pt-32 pb-16 px-8">
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-400/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-white/80 relative z-10">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase mb-6 border border-indigo-100">
          Hikayemiz
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter mb-8">
          Gezi<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-500">Mimarı</span> Nedir?
        </h1>
        
        <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
          <p>
            Gezi Mimarı, klasik ve esneklikten uzak tur paketlerinin sınırlarına sıkışmak istemeyen, kendi rotasını kendi çizmek isteyen özgür ruhlu gezginler için tasarlandı.
          </p>
          <p>
            Seyahat planlamayı saatler süren karmaşık bir angarya olmaktan çıkarıp, modern, hızlı ve eğlenceli bir deneyime dönüştürüyoruz. Sürükle-bırak teknolojimiz ve anlık bütçe hesaplama algoritmamız sayesinde, hayalinizdeki tatili saniyeler içinde tasarlayabilirsiniz.
          </p>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 mt-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Proje Hakkında</h3>
            <p className="text-sm text-slate-500">
              Bu platform, yenilikçi web teknolojileri kullanılarak interaktif bir kullanıcı deneyimi sunmak amacıyla, kurucu mimarımız Yusuf tarafından bir bitirme projesi olarak hayata geçirilmiştir.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hakkimizda