function RoutePlaceCard({ item, index, currency, isDragging, onSelect }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
      className={`bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex gap-5 transition-all cursor-pointer ${
        isDragging ? 'shadow-2xl ring-2 ring-indigo-500 scale-[1.02] z-[2000]' : 'hover:shadow-md hover:border-indigo-200'
      }`}
    >
      <div className="relative shrink-0">
        <img src={item.image} className="w-24 h-24 rounded-2xl object-cover shadow-inner" alt="" />
        <div className="absolute -top-2 -left-2 w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-black border-4 border-white">
          {index + 1}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-black text-slate-800 text-lg">{item.content}</h4>
          <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100">
            {item.cost === 0 ? 'Ücretsiz' : `${item.cost} ${currency}`}
          </span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3">{item.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-tighter">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  )
}

export default RoutePlaceCard
