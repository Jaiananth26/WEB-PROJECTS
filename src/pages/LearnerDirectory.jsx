import { useEffect, useMemo, useState } from 'react'
import EmptyState from '../components/EmptyState'
import { EMPTY_LEARNER } from '../data'
import { makeId, readStore, writeStore } from '../utils/storage'

function LearnerDirectory() {
  const [learners, setLearners] = useState([])
  const [form, setForm] = useState(EMPTY_LEARNER)
  const [search, setSearch] = useState('')
  const [classFilter, setClassFilter] = useState('all')
  const [error, setError] = useState('')

  useEffect(() => setLearners(readStore('learners')), [])

  const classes = [...new Set(learners.map((item) => item.className).filter(Boolean))].sort()
  const filtered = useMemo(() => learners.filter((learner) => {
    const needle = search.trim().toLowerCase()
    const matchesSearch = !needle || [learner.name, learner.roll, learner.email, learner.className].some((value) => value.toLowerCase().includes(needle))
    const matchesClass = classFilter === 'all' || learner.className === classFilter
    return matchesSearch && matchesClass
  }), [learners, search, classFilter])

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    setError('')
  }

  function addLearner(event) {
    event.preventDefault()
    if (Object.values(form).some((value) => !value.trim())) return setError('Please complete every learner field.')
    if (learners.some((learner) => learner.roll.trim().toLowerCase() === form.roll.trim().toLowerCase())) return setError('That roll number is already in the directory.')

    const next = [...learners, { ...form, id: makeId('learner'), createdAt: new Date().toISOString() }]
    setLearners(next)
    writeStore('learners', next)
    setForm(EMPTY_LEARNER)
    setError('')
  }

  function deleteLearner(id) {
    const learner = learners.find((item) => item.id === id)
    if (!learner || !window.confirm(`Delete ${learner.name} from the learner directory?`)) return
    const next = learners.filter((item) => item.id !== id)
    setLearners(next)
    writeStore('learners', next)
  }

  return (
    <div className="page-stack">
      <section className="directory-layout">
        <form className="paper-panel form-sheet" onSubmit={addLearner}>
          <span className="section-kicker">NEW RECORD</span>
          <h2>Open a learner file</h2>
          <p className="form-intro">Every learner gets one clean record that can be reused across marks and attendance.</p>
          {error && <div className="form-error">{error}</div>}
          <label>Student name<input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Arun Kumar" /></label>
          <label>Roll number<input name="roll" value={form.roll} onChange={handleChange} placeholder="e.g. 101" /></label>
          <label>Department / Class<input name="className" value={form.className} onChange={handleChange} placeholder="e.g. CSE-A" /></label>
          <label>Email<input type="email" name="email" value={form.email} onChange={handleChange} placeholder="student@college.edu" /></label>
          <label>Phone number<input name="phone" value={form.phone} onChange={handleChange} placeholder="10 digit number" /></label>
          <button className="ink-button full-button" type="submit">File learner record</button>
        </form>

        <section className="paper-panel directory-panel">
          <div className="panel-heading directory-heading">
            <div><span className="section-kicker">THE DIRECTORY</span><h2>Current learners <sup>{learners.length}</sup></h2></div>
            <div className="filter-row">
              <input className="search-input" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, roll..." />
              <select value={classFilter} onChange={(event) => setClassFilter(event.target.value)}><option value="all">All classes</option>{classes.map((item) => <option key={item}>{item}</option>)}</select>
            </div>
          </div>

          {filtered.length ? <div className="student-table-wrap">
            <div className="student-table-head"><span>Learner</span><span>Class</span><span>Contact</span><span>Action</span></div>
            <div className="student-table">
              {filtered.map((learner, index) => <div className="student-record" key={learner.id}>
                <div className="student-name-cell"><span className="table-number">{String(index + 1).padStart(2, '0')}</span><div><strong>{learner.name}</strong><small>Roll {learner.roll}</small></div></div>
                <div><span className="class-tag">{learner.className}</span></div>
                <div className="contact-cell"><span>{learner.email}</span><small>{learner.phone}</small></div>
                <button className="delete-link" onClick={() => deleteLearner(learner.id)}>Delete</button>
              </div>)}
            </div>
          </div> : <EmptyState symbol="⌕" title="No matching learners" message="Try a different search, or add a new learner using the form." />}
        </section>
      </section>
    </div>
  )
}

export default LearnerDirectory
