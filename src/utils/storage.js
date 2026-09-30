const KEYS = {
  learners: 'sam_learners',
  marks: 'sam_marks',
  attendance: 'sam_attendance',
}

export function readStore(key) {
  try {
    const value = localStorage.getItem(KEYS[key])
    return value ? JSON.parse(value) : []
  } catch {
    return []
  }
}

export function writeStore(key, value) {
  localStorage.setItem(KEYS[key], JSON.stringify(value))
}

export function makeId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export { KEYS }
