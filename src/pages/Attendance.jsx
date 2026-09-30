import { useEffect, useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import StudentRow from '../components/StudentRow'
import { readStore, writeStore } from '../utils/storage'

function Attendance() {
  const [learners, setLearners] = useState([])
  const [records, setRecords] = useState([])
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [classFilter, setClassFilter] = useState('all')

  useEffect(() => {
    setLearners(readStore('learners'))
    setRecords(readStore('attendance'))
  }, [])

  const classes = [...new Set(learners.map((item) => item.className).filter(Boolean))].sort()
  const visible = useMemo(() => learners.filter((learner) => classFilter === 'all' || learner.className === classFilter), [learners, classFilter])
  const todayRecords = records.filter((item) => item.date === date && (classFilter === 'all' || item.className === classFilter))
  const present = todayRecords.filter((item) => item.status === 'Present').length
  const marked = todayRecords.length
  const overall = learners.map((learner) => {
    const studentRecords = records.filter((item) => item.learnerId === learner.id)
    const presentCount = studentRecords.filter((item) => item.status === 'Present').length
    return { ...learner, rate: studentRecords.length ? (presentCount / studentRecords.length) * 100 : 0 }
  })

  function setStatus(learner, status) {
    const withoutCurrent = records.filter((item) => !(item.date === date && item.learnerId === learner.id))
    const next = [...withoutCurrent, { learnerId: learner.id, learnerName: learner.name, roll: learner.roll, className: learner.className, date, status }]
    setRecords(next)
    writeStore('attendance', next)
  }

  return (
    <div className="page-stack">
      <section className="attendance-toolbar paper-panel">
        <div><span className="section-kicker">ROLL CALL / DAILY EDITION</span><h2>Take today's attendance</h2></div>
        <div className="attendance-controls"><label>Date<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label><label>Class<select value={classFilter} onChange={(event) => setClassFilter(event.target.value)}><option value="all">All classes</option>{classes.map((item) => <option key={item}>{item}</option>)}</select></label></div>
      </section>

      <section className="attendance-layout">
        <div className="paper-panel roll-panel">
          <div className="roll-summary"><div><span>Marked today</span><strong>{marked} / {visible.length}</strong></div><div><span>Present</span><strong>{present}</strong></div><div><span>Absent</span><strong>{marked - present}</strong></div></div>
          {visible.length ? <div className="attendance-list">{visible.map((learner) => {
            const current = records.find((item) => item.date === date && item.learnerId === learner.id)?.status || ''
            return <StudentRow key={learner.id} learner={learner} attendance={current} onStatus={(status) => setStatus(learner, status)} />
          })}</div> : <EmptyState symbol="✓" title="No learners to mark" message="Add learners in the directory first." />}
        </div>

        <aside className="paper-panel attendance-insight">
          <span className="section-kicker">LONG VIEW</span>
          <h3>Attendance ledger</h3>
          <p>Percentage is calculated from every saved roll call for each learner.</p>
          <div className="attendance-meters">{overall.slice(0, 8).map((learner) => <div className="meter-row" key={learner.id}><div><strong>{learner.name}</strong><span>{learner.rate ? `${learner.rate.toFixed(0)}%` : 'Not started'}</span></div><div className="meter-track"><i style={{ width: `${learner.rate}%` }} /></div></div>)}</div>
        </aside>
      </section>
    </div>
  )
}

export default Attendance
