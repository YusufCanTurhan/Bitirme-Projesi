export const PLACES_COLUMN_ID = 'places'
export const DEFAULT_DAY = 'day1'
export const DEFAULT_DAY_COUNT = 3
export const MIN_DAYS = 1
export const MAX_DAYS = 7

export function createDayIds(count = DEFAULT_DAY_COUNT) {
  const safe = Math.min(MAX_DAYS, Math.max(MIN_DAYS, count))
  return Array.from({ length: safe }, (_, i) => `day${i + 1}`)
}

export function getDayTitle(dayId) {
  const index = parseInt(dayId.replace('day', ''), 10)
  return Number.isNaN(index) ? dayId : `${index}. Gün`
}

export function getDayIdsFromColumns(columns) {
  return Object.keys(columns)
    .filter((key) => key.startsWith('day'))
    .sort((a, b) => parseInt(a.replace('day', ''), 10) - parseInt(b.replace('day', ''), 10))
}

export function getNextDayId(dayIds) {
  const max = dayIds.reduce((acc, id) => Math.max(acc, parseInt(id.replace('day', ''), 10)), 0)
  return `day${max + 1}`
}
