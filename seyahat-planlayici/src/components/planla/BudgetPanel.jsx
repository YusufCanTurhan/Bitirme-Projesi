function BudgetPanel({
  totalCost,
  currency,
  budgetLimit,
  onBudgetLimitChange,
  isOverBudget,
  costByCategory,
}) {
  const limitNum = budgetLimit === '' ? null : Number(budgetLimit)
  const progress =
    limitNum && limitNum > 0 ? Math.min(100, Math.round((totalCost / limitNum) * 100)) : null

  return (
    <div className="px-8 pb-4 shrink-0 space-y-3">
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Bütçe limiti
          </span>
          <input
            type="number"
            min="0"
            placeholder="Örn: 200"
            value={budgetLimit}
            onChange={(e) => onBudgetLimitChange(e.target.value)}
            className="w-28 px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </label>
        <div className="text-sm font-medium text-slate-500">
          Harcama:{' '}
          <span className={isOverBudget ? 'text-red-600 font-black' : 'text-slate-800 font-black'}>
            {totalCost} {currency}
          </span>
          {limitNum != null && !Number.isNaN(limitNum) && (
            <span className="text-slate-400"> / {limitNum} {currency}</span>
          )}
        </div>
      </div>

      {isOverBudget && (
        <p className="text-xs font-bold text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
          Bütçe limitini aştınız. Planınızı gözden geçirin.
        </p>
      )}

      {progress != null && (
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              isOverBudget ? 'bg-red-500' : 'bg-indigo-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {costByCategory.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {costByCategory.map(({ category, amount }) => (
            <span
              key={category}
              className="text-[10px] font-bold bg-slate-50 text-slate-600 border border-slate-100 px-2.5 py-1 rounded-full"
            >
              {category}: {amount} {currency}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default BudgetPanel
