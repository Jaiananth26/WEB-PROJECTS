import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import StatBox from '../components/StatBox'
import EmptyState from '../components/EmptyState'
import { readStore } from '../utils/storage'

function Overview() {
  const [learners, setLearners] = useState([])
  const [marks, setMarks] = useState([])
  const [attendance, setAttendance] = useState([])

  useEffect(() => {
    const refresh = () => {
      setLearners(readStore('learners'))
      setMarks(readStore('marks'))
      setAttendance(readStore('attendance'))
    }
    refresh()
    window.addEventListener('storage', refresh)
    return () => window.removeEventListener('storage', refresh)
  }, [])

  const average = marks.length ? marks.reduce((sum, row) => sum + row.percentage, 0) / marks.length : 0
  const present = attendance.filter((row) => row.status === 'Present').length
  const attendanceRate = attendance.length ? (present / attendance.length) * 100 : 0
  const recent = [...learners].reverse().slice(0, 5)

  return (
    <div className="page-stack">
      <section className="overview-hero paper-panel">
        <div className="hero-copy">
          <span className="section-kicker">THE ACADEMIC REGISTER</span>
          <h2>Everything important, <em>between the covers.</em></h2>
          <p>StudyLedger keeps your learner list, marks and attendance connected so each record tells the same story.</p>
          <div className="hero-actions">
            <Link className="ink-button" to="/learners">+ Add learner</Link>
            <Link className="quiet-button" to="/gradebook">Enter marks →</Link>
          </div>
        </div>
        <div className="ledger-stamp">
          <span>REG.</span>
          <strong>{String(learners.length).padStart(2, '0')}</strong>
          <small>LEARNERS</small>
        </div>
      </section>

      <section className="stat-ribbon" aria-label="Academic summary">
        <StatBox label="Total learners" value={learners.length} hint="active records" accent="olive" />
        <StatBox label="With marks" value={marks.length} hint="gradebook entries" accent="burgundy" />
        <StatBox label="Average" value={`${average.toFixed(1)}%`} hint="recorded results" accent="orange" />
        <StatBox label="Attendance" value={`${attendanceRate.toFixed(0)}%`} hint="marked roll calls" accent="ink" />
      </section>

      <section className="overview-grid">
        <div className="paper-panel recent-panel">
          <div className="panel-heading">
            <div><span className="section-kicker">NEW ON THE SHELF</span><h3>Recently added learners</h3></div>
            <Link to="/learners">View directory</Link>
          </div>
          {recent.length ? <div className="recent-list">
            {recent.map((learner) => (
              <div className="recent-item" key={learner.id}>
                <span className="index-mark">{String(learners.indexOf(learner) + 1).padStart(2, '0')}</span>
                <div><strong>{learner.name}</strong><span>{learner.roll} · {learner.className}</span></div>
                <span className="record-dot">●</span>
              </div>
            ))}
          </div> : <EmptyState symbol="⌑" title="The register is quiet" message="Add your first learner to start building the academic record." />}
        </div>

        <div className="paper-panel quick-panel">
          <span className="section-kicker">QUICK DESK</span>
          <h3>Common tasks</h3>
          <div className="quick-links">
            <Link to="/learners"><span>01</span><b>Manage learners</b><small>Directory & classes</small></Link>
            <Link to="/gradebook"><span>02</span><b>Record marks</b><small>Five subject gradebook</small></Link>
            <Link to="/attendance"><span>03</span><b>Take attendance</b><small>Daily roll call</small></Link>
            <Link to="/performance"><span>04</span><b>Read insights</b><small>Class performance</small></Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Overview
