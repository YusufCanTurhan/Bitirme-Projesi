import { Link } from 'react-router-dom'
import { getCoverImage } from '../../constants/images'

function DestinationCard({ destination, featured = false }) {
  const sizeClass = featured
    ? 'lg:col-span-2 aspect-[21/9] lg:aspect-auto'
    : 'aspect-[4/3]'

  return (
    <Link
      to={`/planla/${destination.id}`}
      className={`group relative rounded-[2rem] overflow-hidden shadow-md border border-slate-100 block ${sizeClass}`}
    >
      <img
        src={getCoverImage(destination.coverImage)}
        alt={destination.city}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-between p-6 md:p-8">
        <div className="flex justify-end">
          <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-xs font-black px-4 py-1.5 rounded-full shadow-lg">
            {destination.currency}
          </span>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
            <span className="bg-indigo-500 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest">
              Kendi Planını Yap
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tight">
            {destination.city}
          </h3>
          <p className="text-slate-300 text-sm font-medium">{destination.country}</p>
        </div>
      </div>
    </Link>
  )
}

export default DestinationCard
