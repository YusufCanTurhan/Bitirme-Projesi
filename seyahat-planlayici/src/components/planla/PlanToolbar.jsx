const STATUS_LABELS = {
  idle: null,
  saving: 'Kaydediliyor…',
  saved: 'Otomatik kaydedildi',
  loaded: 'Kayıtlı plan yüklendi',
  cleared: 'Plan sıfırlandı',
  error: 'Kayıt başarısız',
}

function PlanToolbar({ saveStatus, onSave, onClear }) {
  const statusText = STATUS_LABELS[saveStatus]

  return (
    <div className="flex flex-wrap items-center gap-2 px-8 pb-4 shrink-0">
      <button
        type="button"
        onClick={onSave}
        className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
      >
        Kaydet
      </button>
      <button
        type="button"
        onClick={onClear}
        className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
      >
        Planı Sıfırla
      </button>
      {statusText && (
        <span
          className={`text-xs font-medium ml-auto ${
            saveStatus === 'error' ? 'text-red-500' : 'text-slate-400'
          }`}
        >
          {statusText}
        </span>
      )}
    </div>
  )
}

export default PlanToolbar
