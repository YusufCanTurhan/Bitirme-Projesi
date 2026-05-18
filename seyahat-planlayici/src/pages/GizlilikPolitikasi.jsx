import ContentPage from '../components/layout/ContentPage'

function GizlilikPolitikasi() {
  return (
    <ContentPage>
      <h1 className="text-4xl font-black text-slate-800 tracking-tighter mb-8">Gizlilik Politikası</h1>
      <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
        <p>
          Gezi Mimarı olarak gizliliğinize önem veriyoruz. Bu politika, uygulamamızı kullandığınızda
          verilerinizin nasıl işlendiğini açıklar.
        </p>
        <h3 className="text-xl font-bold text-slate-800">1. Toplanan Veriler</h3>
        <p>
          Uygulamamız şu an için herhangi bir üyelik sistemi barındırmadığından, şahsi kimlik bilgileriniz
          sunucularımızda depolanmaz. Oluşturduğunuz rotalar yalnızca tarayıcınızın yerel depolama alanında
          (Local Storage) tutulur.
        </p>
        <h3 className="text-xl font-bold text-slate-800">2. Çerezler</h3>
        <p>Deneyiminizi iyileştirmek ve tercihlerinizi hatırlamak için temel düzeyde teknik çerezler kullanılabilir.</p>
        <h3 className="text-xl font-bold text-slate-800">3. Üçüncü Taraf Bağlantıları</h3>
        <p>
          Rotalarınızda yer alan mekan görselleri dış kaynaklardan (Unsplash vb.) çekilmektedir. Bu sitelerin
          kendi gizlilik politikaları geçerlidir.
        </p>
      </div>
    </ContentPage>
  )
}

export default GizlilikPolitikasi
