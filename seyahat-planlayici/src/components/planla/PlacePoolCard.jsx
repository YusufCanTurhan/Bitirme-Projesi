function PlacePoolCard({ item, isDragging, onSelect }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
      className={`bg-white border border-slate-100 rounded-2xl p-3 shadow-sm flex items-center gap-3 transition-all cursor-pointer ${
        isDragging ? 'shadow-2xl ring-2 ring-indigo-500 z-[2000]' : 'hover:border-indigo-200 hover:shadow-md'
      }`}
    >
      <img src={item.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
      <div className="min-w-0">
        <h4 className="font-bold text-slate-800 text-[11px] truncate leading-tight">{item.content}</h4>
        <p className="text-[9px] font-black text-indigo-500 uppercase mt-0.5 tracking-tighter">{item.category}</p>
      </div>
    </div>
  )
}

export default PlacePoolCard
