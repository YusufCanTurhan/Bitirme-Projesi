import { MAX_DAYS } from '../../constants/days'

function DayTabs({
  dayIds,
  aktifGun,
  onDayChange,
  onAddDay,
  onRemoveDay,
  canAddDay,
  canRemoveDay,
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 shrink-0">
      <div className="flex flex-wrap gap-2">
        {dayIds.map((gun, index) => (
          <button
            key={gun}
            type="button"
            onClick={() => onDayChange(gun)}
            className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
              aktifGun === gun
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'
            }`}
          >
            {index + 1}. Gün
          </button>
        ))}
      </div>
      <div className="flex gap-1 ml-auto">
        {canAddDay && (
          <button
            type="button"
            onClick={onAddDay}
            title={`En fazla ${MAX_DAYS} gün`}
            className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 font-black text-lg hover:bg-indigo-100 border border-indigo-100"
          >
            +
          </button>
        )}
        {canRemoveDay && (
          <button
            type="button"
            onClick={onRemoveDay}
            className="w-9 h-9 rounded-xl bg-slate-50 text-slate-500 font-black text-lg hover:bg-slate-100 border border-slate-100"
          >
            −
          </button>
        )}
      </div>
    </div>
  )
}

export default DayTabs
