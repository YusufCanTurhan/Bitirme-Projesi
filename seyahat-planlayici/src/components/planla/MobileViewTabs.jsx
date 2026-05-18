function MobileViewTabs({ activeView, onViewChange }) {
  return (
    <div className="lg:hidden flex p-2 gap-2 bg-slate-100 rounded-2xl mx-4 mt-4 shrink-0">
      <button
        type="button"
        onClick={() => onViewChange('plan')}
        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
          activeView === 'plan' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
        }`}
      >
        Plan
      </button>
      <button
        type="button"
        onClick={() => onViewChange('map')}
        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
          activeView === 'map' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'
        }`}
      >
        Harita
      </button>
    </div>
  )
}

export default MobileViewTabs
