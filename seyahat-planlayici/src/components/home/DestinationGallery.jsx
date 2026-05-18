import { Link } from 'react-router-dom'
import DestinationCard from './DestinationCard'

function DestinationGallery({ destinations }) {
  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-slate-800 mb-2">
            Başlamaya Hazır Mısın?
          </h2>
          <p className="text-slate-500 font-medium">
            Popüler destinasyonlarımızdan birini seç ve maceranı şekillendir.
          </p>
        </div>
        <Link
          to="/"
          className="text-indigo-600 font-bold hover:text-fuchsia-500 transition-colors hidden md:block"
        >
          Tüm Şehirleri Gör &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest, idx) => (
          <DestinationCard key={dest.id} destination={dest} featured={idx === 0} />
        ))}
      </div>
    </section>
  )
}

export default DestinationGallery
