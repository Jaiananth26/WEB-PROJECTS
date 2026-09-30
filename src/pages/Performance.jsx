import { useEffect, useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import { SUBJECTS } from '../data'
import { readStore } from '../utils/storage'

function Performance() {
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

  const stats = useMemo(() => {
    const percentages = marks.map((item) => item.percentage)
    const average = percentages.length ? percentages.reduce((a, b) => a + b, 0) / percentages.length : 0
    const subjectAverages = SUBJECTS.map((subject) => {
      const values = marks.map((item) => Number(item[subject])).filter(Number.isFinite)
      return { subject, value: values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0 }
    })
    return { average, highest: percentages.length ? Math.max(...percentages) : 0, lowest: percentages.length ? Math.min(...percentages) : 0, pass: marks.filter((item) => item.status === 'Pass').length, fail: marks.filter((item) => item.status === 'Fail').length, subjectAverages }
  }, [marks])

  return (
    <div className="page-stack">
      <section className="insight-intro paper-panel">
        <div><span className="section-kicker">THE CLASSROOM PICTURE</span><h2>Numbers, without the noise.</h2><p>Performance is derived directly from the gradebook. No extra data entry is needed.</p></div>
        <div className="big-average"><span>CLASS AVERAGE</span><strong>{stats.average.toFixed(1)}%</strong><i style={{ width: `${Math.min(stats.average, 100)}%` }} /></div>
      </section>

      <section className="insight-stat-grid">
        <div className="insight-stat"><span>Highest</span><strong>{stats.highest.toFixed(1)}%</strong><small>top recorded result</small></div>
        <div className="insight-stat"><span>Lowest</span><strong>{stats.lowest.toFixed(1)}%</strong><small>lowest recorded result</small></div>
        <div className="insight-stat pass-stat"><span>Pass count</span><strong>{stats.pass}</strong><small>40% and above</small></div>
        <div className="insight-stat fail-stat"><span>Fail count</span><strong>{stats.fail}</strong><small>below 40%</small></div>
      </section>

      <section className="insight-grid">
        <div className="paper-panel subject-panel">
          <div className="panel-heading"><div><span className="section-kicker">SUBJECT LEDGER</span><h3>Average by subject</h3></div></div>
          {marks.length ? <div className="subject-bars">{stats.subjectAverages.map((item) => <div className="subject-bar" key={item.subject}><div><span>{item.subject}</span><b>{item.value.toFixed(1)}%</b></div><div className="bar-track"><i style={{ width: `${item.value}%` }} /></div></div>)}</div> : <EmptyState symbol="◒" title="Waiting for results" message="Add marks in the gradebook to reveal subject averages." />}
        </div>

        <div className="paper-panel cohort-panel">
          <span className="section-kicker">REGISTER HEALTH</span>
          <h3>Record coverage</h3>
          <div className="coverage-ring"><span>{learners.length ? Math.round((marks.length / learners.length) * 100) : 0}%</span></div>
          <p>{marks.length} of {learners.length} learners have a saved marks record.</p>
          <div className="coverage-line"><span>Attendance entries</span><b>{attendance.length}</b></div>
        </div>
      </section>

      <section className="paper-panel performance-table-panel">
        <div className="panel-heading"><div><span className="section-kicker">PERFORMANCE TABLE</span><h3>Student performance <sup>{marks.length}</sup></h3></div></div>
        {marks.length ? <div className="performance-table"><div className="performance-head"><span>Student</span><span>Total</span><span>Percentage</span><span>Grade</span><span>Status</span></div>{marks.map((record) => <div className="performance-row" key={record.id}><strong>{record.learnerName}<small>{record.roll} · {record.className}</small></strong><span>{record.total}/500</span><span><div className="mini-progress"><i style={{ width: `${record.percentage}%` }} /></div>{record.percentage.toFixed(1)}%</span><b className={`grade-pill grade-${record.grade.replace('+', 'plus')}`}>{record.grade}</b><span className={record.status === 'Pass' ? 'status-text pass' : 'status-text fail'}>{record.status}</span></div>)}</div> : <EmptyState symbol="≋" title="Nothing to analyse yet" message="Your performance table will populate automatically when results are saved." />}
      </section>
    </div>
  )
}

export default Performance
