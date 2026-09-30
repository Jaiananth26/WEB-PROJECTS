import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '../data'

function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <button className="sidebar-scrim" onClick={onClose} aria-label="Close menu" />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="brand-lockup">
          <div className="brand-mark">SL</div>
          <div>
            <strong>StudyLedger</strong>
            <span>Academic record room</span>
          </div>
        </div>

        <div className="shelf-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-note">
          <span className="note-pin">✦</span>
          <p><strong>Registrar's note</strong><br />Keep learner records tidy. Your browser is the filing cabinet.</p>
        </div>

        <div className="sidebar-footer">LOCAL • OFFLINE DATA</div>
      </aside>
    </>
  )
}

export default Sidebar
