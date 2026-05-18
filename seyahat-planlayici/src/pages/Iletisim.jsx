import ContentPage from '../components/layout/ContentPage'

function Iletisim() {
  return (
    <ContentPage maxWidth="max-w-3xl">
      <h1 className="text-4xl font-black text-slate-800 tracking-tighter mb-8">İletişime Geçin</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">Bize Ulaşın</h3>
          <p className="text-slate-600 mb-6">
            Soru, öneri ve işbirlikleri için formu doldurabilir veya doğrudan mail atabilirsiniz.
          </p>
          <div className="space-y-4 text-sm font-medium text-slate-700">
            <p>📍 İstanbul, Türkiye</p>
            <p>✉️ hello@gezimimari.com</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Adınız Soyadınız"
            className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="email"
            placeholder="E-posta Adresiniz"
            className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <textarea
            placeholder="Mesajınız..."
            rows={4}
            className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
          <button
            type="submit"
            className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-600 transition-colors"
          >
            Mesaj Gönder
          </button>
        </form>
      </div>
    </ContentPage>
  )
}

export default Iletisim
