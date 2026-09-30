export const SUBJECTS = ['Tamil', 'English', 'Mathematics', 'Science', 'Social Science']

export const NAV_ITEMS = [
  { to: '/', label: 'Overview', icon: '⌂', end: true },
  { to: '/learners', label: 'Learner Directory', icon: '▦' },
  { to: '/gradebook', label: 'Marks & Gradebook', icon: '✎' },
  { to: '/attendance', label: 'Attendance Tracker', icon: '✓' },
  { to: '/performance', label: 'Performance Insights', icon: '◒' },
]

export const EMPTY_LEARNER = {
  name: '',
  roll: '',
  className: '',
  email: '',
  phone: '',
}

export const EMPTY_MARKS = {
  learnerId: '',
  Tamil: '',
  English: '',
  Mathematics: '',
  Science: '',
  'Social Science': '',
}

export function getGrade(percentage) {
  if (percentage >= 90) return 'A+'
  if (percentage >= 80) return 'A'
  if (percentage >= 70) return 'B+'
  if (percentage >= 60) return 'B'
  if (percentage >= 50) return 'C'
  return 'F'
}

export function getStatus(percentage) {
  return percentage >= 40 ? 'Pass' : 'Fail'
}
