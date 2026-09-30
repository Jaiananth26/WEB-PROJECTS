import { useLocation } from 'react-router-dom'

const TITLES = {
  '/': ['Overview', 'A calm view of the academic register.'],
  '/learners': ['Learner Directory', 'Add, find and maintain learner records.'],
  '/gradebook': ['Marks & Gradebook', 'Record subject marks and let the ledger do the maths.'],
  '/attendance': ['Attendance Tracker', 'Take a daily roll call without the spreadsheet clutter.'],
  '/performance': ['Performance Insights', 'Read the class story through simple measures.'],
}

function Header({ onMenu }) {
  const location = useLocation()
  const [title, subtitle] = TITLES[location.pathname] || TITLES['/']
  const today = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }).format(new Date())

  return (
    <header className="topbar">
      <button className="menu-button" onClick={onMenu} aria-label="Open navigation">☰</button>
      <div>
        <div className="eyebrow">CAMPUS REGISTER / 2026</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="date-slip">
        <span>Today</span>
        <strong>{today}</strong>
      </div>
    </header>
  )
}

export default Header
