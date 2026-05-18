import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DEFAULT_DAY, getDayIdsFromColumns } from '../constants/days'
import { getDestinationById, getPlacesByDestinationId } from '../services/destinationService'
import { clearPlan, loadPlan, savePlan } from '../services/tripStorage'
import {
  addDayColumn,
  applyDragEnd,
  calculateCostByCategory,
  calculateTotalCost,
  createInitialColumns,
  getDayIds,
  mergePlacesForMap,
  removeDayColumn,
} from '../utils/tripPlanner'

function buildStateFromStorage(saved, destinationPlaces) {
  const reviveItems = (items = []) =>
    items
      .map((item) => destinationPlaces.find((p) => p.id === item.id))
      .filter(Boolean)

  const columns = {}
  Object.entries(saved.columns).forEach(([key, col]) => {
    columns[key] = { ...col, items: reviveItems(col.items) }
  })

  return {
    columns,
    budgetLimit: saved.budgetLimit ?? '',
    aktifGun: saved.aktifGun && columns[saved.aktifGun] ? saved.aktifGun : DEFAULT_DAY,
  }
}

export function useTripPlanner(destinationId) {
  const destination = getDestinationById(destinationId)
  const destinationPlaces = getPlacesByDestinationId(destinationId)

  const [columns, setColumns] = useState(() => createInitialColumns(destinationPlaces))
  const [aktifGun, setAktifGun] = useState(DEFAULT_DAY)
  const [odaklanilacakMekan, setOdaklanilacakMekan] = useState(null)
  const [rotaDetaylari, setRotaDetaylari] = useState([])
  const [budgetLimit, setBudgetLimit] = useState('')
  const [saveStatus, setSaveStatus] = useState('idle')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const saveTimerRef = useRef(null)
  const isFirstMount = useRef(true)

  const dayIds = useMemo(() => getDayIds(columns), [columns])
  const totalCost = useMemo(() => calculateTotalCost(columns, dayIds), [columns, dayIds])
  const costByCategory = useMemo(() => calculateCostByCategory(columns, dayIds), [columns, dayIds])
  const mapPlaces = useMemo(
    () => mergePlacesForMap(destinationPlaces, columns),
    [destinationPlaces, columns]
  )

  const budgetLimitNum = budgetLimit === '' ? null : Number(budgetLimit)
  const isOverBudget = budgetLimitNum != null && !Number.isNaN(budgetLimitNum) && totalCost > budgetLimitNum

  const persistPlan = useCallback(
    (nextColumns, nextBudget = budgetLimit, nextDay = aktifGun) => {
      if (!destinationId) return
      const ok = savePlan({
        destinationId,
        columns: nextColumns,
        budgetLimit: nextBudget === '' ? null : Number(nextBudget),
        aktifGun: nextDay,
      })
      setSaveStatus(ok ? 'saved' : 'error')
    },
    [destinationId, budgetLimit, aktifGun]
  )

  const scheduleAutoSave = useCallback(
    (nextColumns, nextBudget, nextDay) => {
      setSaveStatus('saving')
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
      saveTimerRef.current = setTimeout(() => {
        persistPlan(nextColumns, nextBudget, nextDay)
      }, 400)
    },
    [persistPlan]
  )

  useEffect(() => {
    const places = getPlacesByDestinationId(destinationId)
    const saved = loadPlan(destinationId)

    if (saved?.columns) {
      const restored = buildStateFromStorage(saved, places)
      setColumns(restored.columns)
      setAktifGun(restored.aktifGun)
      setBudgetLimit(restored.budgetLimit === null || restored.budgetLimit === undefined ? '' : String(restored.budgetLimit))
      setSaveStatus('loaded')
    } else {
      setColumns(createInitialColumns(places))
      setAktifGun(DEFAULT_DAY)
      setBudgetLimit('')
      setSaveStatus('idle')
    }

    setOdaklanilacakMekan(null)
    setRotaDetaylari([])
    setCategoryFilter('all')
    isFirstMount.current = true
  }, [destinationId])

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    scheduleAutoSave(columns, budgetLimit, aktifGun)
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    }
  }, [columns, budgetLimit, aktifGun, scheduleAutoSave])

  useEffect(() => {
    if (!columns[aktifGun] && dayIds.length > 0) {
      setAktifGun(dayIds[0])
    }
  }, [columns, aktifGun, dayIds])

  const onDragEnd = (result) => {
    setColumns((prev) => applyDragEnd(prev, result))
  }

  const handleAddDay = () => {
    setColumns((prev) => {
      const next = addDayColumn(prev)
      const newDayId = getDayIdsFromColumns(next).at(-1)
      if (newDayId) setAktifGun(newDayId)
      return next
    })
  }

  const handleRemoveDay = () => {
    if (dayIds.length <= 1) return
    setColumns((prev) => {
      const next = removeDayColumn(prev, aktifGun)
      const remaining = getDayIdsFromColumns(next)
      if (!remaining.includes(aktifGun)) setAktifGun(remaining[0])
      return next
    })
  }

  const handleClearPlan = () => {
    clearPlan(destinationId)
    const places = getPlacesByDestinationId(destinationId)
    setColumns(createInitialColumns(places))
    setAktifGun(DEFAULT_DAY)
    setBudgetLimit('')
    setOdaklanilacakMekan(null)
    setRotaDetaylari([])
    setSaveStatus('cleared')
  }

  const handleManualSave = () => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    persistPlan(columns, budgetLimit, aktifGun)
  }

  const poolCategories = useMemo(() => {
    const cats = new Set(columns.places?.items?.map((p) => p.category).filter(Boolean) ?? [])
    return ['all', ...Array.from(cats).sort()]
  }, [columns])

  const filteredPoolItems = useMemo(() => {
    const items = columns.places?.items ?? []
    if (categoryFilter === 'all') return items
    return items.filter((p) => p.category === categoryFilter)
  }, [columns, categoryFilter])

  return {
    destination,
    destinationPlaces,
    mapPlaces,
    columns,
    dayIds,
    aktifGun,
    setAktifGun,
    odaklanilacakMekan,
    setOdaklanilacakMekan,
    rotaDetaylari,
    setRotaDetaylari,
    onDragEnd,
    totalCost,
    costByCategory,
    budgetLimit,
    setBudgetLimit,
    isOverBudget,
    saveStatus,
    handleAddDay,
    handleRemoveDay,
    handleClearPlan,
    handleManualSave,
    categoryFilter,
    setCategoryFilter,
    poolCategories,
    filteredPoolItems,
    canAddDay: dayIds.length < 7,
    canRemoveDay: dayIds.length > 1,
  }
}
