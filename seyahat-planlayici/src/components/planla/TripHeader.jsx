function TripHeader({ destination, totalCost, isOverBudget = false }) {
  return (
    <div className="p-8 pb-6 shrink-0">
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-4xl font-black mb-3 tracking-tight">{destination.city} Macerası</h1>
          <p className="text-indigo-100 text-sm font-medium mb-6 flex items-center gap-2">
            <span className="text-base">📍</span> {destination.country}
          </p>
          <div className="flex gap-3">
            <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
              <span className="text-[10px] uppercase font-black tracking-widest block opacity-70 mb-0.5">
                Toplam Bütçe
              </span>
              <span className={`text-xl font-black ${isOverBudget ? 'text-red-200' : ''}`}>
                {totalCost} {destination.currency}
              </span>
            </div>
            <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-center">
              <span className="text-xs font-bold">Kişisel Rota</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripHeader
