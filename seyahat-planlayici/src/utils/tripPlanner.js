import {
  PLACES_COLUMN_ID,
  createDayIds,
  getDayIdsFromColumns,
  getDayTitle,
  getNextDayId,
  MAX_DAYS,
} from '../constants/days'

export function createInitialColumns(destinationPlaces, dayIds = createDayIds()) {
  const columns = {
    [PLACES_COLUMN_ID]: {
      id: PLACES_COLUMN_ID,
      title: 'Mekan Havuzu',
      items: [...destinationPlaces],
    },
  }

  dayIds.forEach((dayId) => {
    columns[dayId] = { id: dayId, title: getDayTitle(dayId), items: [] }
  })

  return columns
}

export function applyDragEnd(columns, result) {
  const { source, destination: dropDest } = result
  if (!dropDest) return columns
  if (source.droppableId === dropDest.droppableId && source.index === dropDest.index) {
    return columns
  }

  const sourceCol = columns[source.droppableId]
  const destCol = columns[dropDest.droppableId]
  const sourceItems = [...sourceCol.items]
  const destItems = source.droppableId === dropDest.droppableId ? sourceItems : [...destCol.items]
  const [removed] = sourceItems.splice(source.index, 1)

  if (source.droppableId === dropDest.droppableId) {
    sourceItems.splice(dropDest.index, 0, removed)
    return { ...columns, [source.droppableId]: { ...sourceCol, items: sourceItems } }
  }

  destItems.splice(dropDest.index, 0, removed)
  return {
    ...columns,
    [source.droppableId]: { ...sourceCol, items: sourceItems },
    [dropDest.droppableId]: { ...destCol, items: destItems },
  }
}

export function getDayIds(columns) {
  return getDayIdsFromColumns(columns)
}

export function calculateTotalCost(columns, dayIds = getDayIds(columns)) {
  return dayIds.reduce((sum, day) => {
    return sum + (columns[day]?.items ?? []).reduce((daySum, item) => daySum + (item.cost || 0), 0)
  }, 0)
}

export function calculateCostByCategory(columns, dayIds = getDayIds(columns)) {
  const totals = {}

  dayIds.forEach((day) => {
    ;(columns[day]?.items ?? []).forEach((item) => {
      const category = item.category || 'Diğer'
      totals[category] = (totals[category] || 0) + (item.cost || 0)
    })
  })

  return Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
}

export function addDayColumn(columns) {
  const dayIds = getDayIds(columns)
  if (dayIds.length >= MAX_DAYS) return columns

  const newDayId = getNextDayId(dayIds)
  return {
    ...columns,
    [newDayId]: { id: newDayId, title: getDayTitle(newDayId), items: [] },
  }
}

export function removeDayColumn(columns, dayId) {
  const dayIds = getDayIds(columns)
  if (dayIds.length <= 1 || !columns[dayId]) return columns

  const itemsToReturn = columns[dayId].items
  const next = { ...columns }
  delete next[dayId]

  next[PLACES_COLUMN_ID] = {
    ...next[PLACES_COLUMN_ID],
    items: [...itemsToReturn, ...next[PLACES_COLUMN_ID].items],
  }

  return next
}

export function mergePlacesForMap(destinationPlaces, columns) {
  const map = new Map(destinationPlaces.map((p) => [p.id, p]))
  getDayIds(columns).forEach((day) => {
    columns[day].items.forEach((item) => map.set(item.id, item))
  })
  columns[PLACES_COLUMN_ID].items.forEach((item) => map.set(item.id, item))
  return Array.from(map.values())
}
