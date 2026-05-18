import { Link } from 'react-router-dom'
import { getCoverImage } from '../../constants/images'

function DestinationSearch({ query, setQuery, results, firstResultId }) {
  return (
    <div className="relative w-full max-w-2xl z-50 text-left">
      <div className="bg-white p-2.5 rounded-full shadow-[0_20px_50px_rgb(0,0,0,0.08)] border border-slate-100 flex items-center gap-3 relative group hover:border-indigo-200 transition-colors">
        <div className="bg-indigo-50 p-3 rounded-full text-indigo-500 shrink-0">📍</div>
        <input
          type="text"
          placeholder="Hangi şehri keşfetmek istersin? (Örn: Amsterdam...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent border-none focus:outline-none text-slate-700 font-medium placeholder:text-slate-400 text-sm md:text-base w-full min-w-0"
        />
        <Link
          to={firstResultId ? `/planla/${firstResultId}` : '#'}
          className="bg-slate-900 text-white px-8 py-3.5 rounded-full text-sm font-bold hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-900/20 whitespace-nowrap shrink-0"
        >
          Planlamaya Başla
        </Link>
      </div>

      {query.length > 0 && (
        <div className="absolute top-[110%] left-0 w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-64 overflow-y-auto">
          {results.length > 0 ? (
            results.map((dest) => (
              <Link
                key={dest.id}
                to={`/planla/${dest.id}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-indigo-50/50 border-b border-slate-50 transition-colors last:border-0"
              >
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                  <img
                    src={getCoverImage(dest.coverImage, 'sm')}
                    alt=""
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-base">{dest.city}</h4>
                  <p className="text-xs text-slate-500 font-medium">{dest.country}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-slate-500">
              <span className="text-3xl block mb-2 opacity-50">🧭</span>
              <span className="text-sm font-bold text-slate-600 block">
                &quot;{query}&quot; adında bir şehir bulunamadı.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DestinationSearch
