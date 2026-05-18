const STORAGE_PREFIX = 'gezi-mimari-plan-'
const STORAGE_VERSION = 1

export function getPlanStorageKey(destinationId) {
  return `${STORAGE_PREFIX}${destinationId}`
}

export function loadPlan(destinationId) {
  try {
    const raw = localStorage.getItem(getPlanStorageKey(destinationId))
    if (!raw) return null
    const data = JSON.parse(raw)
    if (data.version !== STORAGE_VERSION || data.destinationId !== destinationId) return null
    return data
  } catch {
    return null
  }
}

export function savePlan(payload) {
  try {
    const data = {
      version: STORAGE_VERSION,
      updatedAt: new Date().toISOString(),
      ...payload,
    }
    localStorage.setItem(getPlanStorageKey(payload.destinationId), JSON.stringify(data))
    return true
  } catch {
    return false
  }
}

export function clearPlan(destinationId) {
  try {
    localStorage.removeItem(getPlanStorageKey(destinationId))
    return true
  } catch {
    return false
  }
}
