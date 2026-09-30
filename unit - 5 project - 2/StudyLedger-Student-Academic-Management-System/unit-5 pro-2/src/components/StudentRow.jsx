function StudentRow({ learner, attendance, onStatus }) {
  return (
    <div className="attendance-row">
      <div className="student-stamp">
        <span>{learner.name.charAt(0).toUpperCase()}</span>
      </div>
      <div className="attendance-person">
        <strong>{learner.name}</strong>
        <span>Roll {learner.roll} · {learner.className}</span>
      </div>
      <div className="attendance-actions">
        <button className={attendance === 'Present' ? 'status-btn present selected' : 'status-btn present'} onClick={() => onStatus('Present')}>Present</button>
        <button className={attendance === 'Absent' ? 'status-btn absent selected' : 'status-btn absent'} onClick={() => onStatus('Absent')}>Absent</button>
      </div>
    </div>
  )
}

export default StudentRow
