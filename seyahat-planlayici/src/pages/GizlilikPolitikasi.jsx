function GizlilikPolitikasi() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 relative overflow-hidden pt-32 pb-16 px-8">
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl p-10 md:p-16 rounded-[2.5rem] shadow-sm border border-white/80 relative z-10">
        <h1 className="text-4xl font-black text-slate-800 tracking-tighter mb-8">Gizlilik Politikası</h1>
        <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
          <p>Gezi Mimarı olarak gizliliğinize önem veriyoruz. Bu politika, uygulamamızı kullandığınızda verilerinizin nasıl işlendiğini açıklar.</p>
          <h3 className="text-xl font-bold text-slate-800">1. Toplanan Veriler</h3>
          <p>Uygulamamız şu an için herhangi bir üyelik sistemi barındırmadığından, şahsi kimlik bilgileriniz sunucularımızda depolanmaz. Oluşturduğunuz rotalar yalnızca tarayıcınızın yerel depolama alanında (Local Storage) tutulur.</p>
          <h3 className="text-xl font-bold text-slate-800">2. Çerezler</h3>
          <p>Deneyiminizi iyileştirmek ve tercihlerinizi hatırlamak için temel düzeyde teknik çerezler kullanılabilir.</p>
          <h3 className="text-xl font-bold text-slate-800">3. Üçüncü Taraf Bağlantıları</h3>
          <p>Rotalarınızda yer alan mekan görselleri dış kaynaklardan (Unsplash vb.) çekilmektedir. Bu sitelerin kendi gizlilik politikaları geçerlidir.</p>
        </div>
      </div>
    </div>
  )
}
export default GizlilikPolitikasi