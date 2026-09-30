import { useEffect, useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import { EMPTY_MARKS, SUBJECTS, getGrade, getStatus } from '../data'
import { makeId, readStore, writeStore } from '../utils/storage'

function Gradebook() {
  const [learners, setLearners] = useState([])
  const [marks, setMarks] = useState([])
  const [form, setForm] = useState(EMPTY_MARKS)
  const [error, setError] = useState('')

  useEffect(() => {
    setLearners(readStore('learners'))
    setMarks(readStore('marks'))
  }, [])

  const selectedLearner = useMemo(() => learners.find((item) => item.id === form.learnerId), [learners, form.learnerId])
  const enteredMarks = SUBJECTS.map((subject) => Number(form[subject])).filter((value) => Number.isFinite(value))
  const total = enteredMarks.length === SUBJECTS.length ? enteredMarks.reduce((sum, value) => sum + value, 0) : 0
  const percentage = enteredMarks.length === SUBJECTS.length ? total / SUBJECTS.length : 0

  function changeMark(event) {
    const { name, value } = event.target
    if (value !== '' && (Number(value) < 0 || Number(value) > 100)) return
    setForm((current) => ({ ...current, [name]: value }))
    setError('')
  }

  function saveMarks(event) {
    event.preventDefault()
    if (!form.learnerId) return setError('Choose a learner before entering marks.')
    if (enteredMarks.length !== SUBJECTS.length) return setError('Enter marks for all five subjects.')
    if (enteredMarks.some((value) => value < 0 || value > 100)) return setError('Each mark must be between 0 and 100.')

    const record = { id: makeId('marks'), learnerId: form.learnerId, learnerName: selectedLearner.name, roll: selectedLearner.roll, className: selectedLearner.className, ...Object.fromEntries(SUBJECTS.map((subject) => [subject, Number(form[subject])])), total, percentage, grade: getGrade(percentage), status: getStatus(percentage), updatedAt: new Date().toISOString() }
    const existing = marks.findIndex((item) => item.learnerId === form.learnerId)
    const next = [...marks]
    if (existing >= 0) next[existing] = { ...record, id: marks[existing].id }
    else next.push(record)
    setMarks(next)
    writeStore('marks', next)
    setForm(EMPTY_MARKS)
    setError('')
  }

  function removeMarks(id) {
    const record = marks.find((item) => item.id === id)
    if (!record || !window.confirm(`Delete the marks record for ${record.learnerName}?`)) return
    const next = marks.filter((item) => item.id !== id)
    setMarks(next)
    writeStore('marks', next)
  }

  return (
    <div className="page-stack">
      <section className="grade-layout">
        <form className="paper-panel grade-form" onSubmit={saveMarks}>
          <div className="grade-title"><span className="section-kicker">MARKS REGISTER</span><h2>Open a score sheet</h2></div>
          <p className="form-intro">One learner, five subjects. Totals and grades are calculated as you type.</p>
          {error && <div className="form-error">{error}</div>}
          <label>Learner<select name="learnerId" value={form.learnerId} onChange={(event) => setForm((current) => ({ ...current, learnerId: event.target.value }))}><option value="">Choose learner</option>{learners.map((learner) => <option key={learner.id} value={learner.id}>{learner.name} · {learner.roll}</option>)}</select></label>
          <div className="marks-grid">
            {SUBJECTS.map((subject, index) => <label key={subject}><span>{String(index + 1).padStart(2, '0')} · {subject}</span><input type="number" min="0" max="100" name={subject} value={form[subject]} onChange={changeMark} placeholder="00" /></label>)}
          </div>
          <div className="calculation-strip"><div><small>TOTAL</small><strong>{total} / 500</strong></div><div><small>PERCENTAGE</small><strong>{percentage.toFixed(1)}%</strong></div><div><small>GRADE</small><strong>{enteredMarks.length === SUBJECTS.length ? getGrade(percentage) : '—'}</strong></div></div>
          <button className="ink-button full-button" type="submit">Save score sheet</button>
        </form>

        <section className="paper-panel results-panel">
          <div className="panel-heading"><div><span className="section-kicker">FILED RESULTS</span><h2>Gradebook <sup>{marks.length}</sup></h2></div></div>
          {marks.length ? <div className="grade-results">
            {marks.map((record) => <article className="grade-card" key={record.id}>
              <div className="grade-card-top"><div><strong>{record.learnerName}</strong><span>{record.roll} · {record.className}</span></div><div className={`grade-seal grade-${record.grade.replace('+', 'plus')}`}><b>{record.grade}</b><small>{record.percentage.toFixed(1)}%</small></div></div>
              <div className="subject-line">{SUBJECTS.map((subject) => <span key={subject}><small>{subject === 'Social Science' ? 'Social' : subject.slice(0, 3)}</small><b>{record[subject]}</b></span>)}</div>
              <div className="grade-card-foot"><span>{record.status} · Total {record.total}/500</span><button className="delete-link" onClick={() => removeMarks(record.id)}>Delete</button></div>
            </article>)}
          </div> : <EmptyState symbol="✎" title="No score sheets yet" message="Choose a learner and enter all five subject marks to file the first result." />}
        </section>
      </section>
    </div>
  )
}

export default Gradebook
