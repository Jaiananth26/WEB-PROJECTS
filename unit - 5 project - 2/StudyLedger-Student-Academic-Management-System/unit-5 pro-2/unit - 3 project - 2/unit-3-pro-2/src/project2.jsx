import { useState } from 'react';

function Project2() {
  // Initial list of 5 students
  const initialStudents = [
    { id: 1, name: 'Mari', status: 'Present' },
    { id: 2, name: 'kamesh', status: 'Absent' },
    { id: 3, name: 'Yuvi', status: 'Present' },
    { id: 4, name: 'jeevi', status: 'Present' },
    { id: 5, name: 'rani', status: 'Absent' },
    { id: 6, name: 'raji', status: 'Present' },
    { id: 7, name: 'harini', status: 'Absent' },
    { id: 8, name: 'jai', status: 'Present' },
    { id: 9, name: 'jayasri', status: 'Absent' },
    { id: 10, name: 'Kanagi', status: 'Present' },
    { id: 11, name: 'deepi', status: 'Absent' },
    { id: 12, name: 'mari', status: 'Present' },
    { id: 13, name: 'mani', status: 'Absent' },
    { id: 14, name: 'nishi', status: 'Present' },
    { id: 15, name: 'nandhini', status: 'Absent' },
    { id: 16, name: 'sivi', status: 'Absent' },
    { id: 17, name: 'ranji', status: 'Present' },
    { id: 18, name: 'sri', status: 'Present' },
    { id: 19, name: 'siva', status: 'Absent' },
    { id: 20, name: 'Hari', status: 'Present' },
  ];

  // State to store the student attendance list
  const [students, setStudents] = useState(initialStudents);

  // Update attendance status of a single student
  const handleStatusChange = (id, newStatus) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
  };

  // Quick actions: Mark all present / absent / reset
  const handleMarkAll = (status) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => ({ ...student, status }))
    );
  };

  const handleReset = () => {
    setStudents(initialStudents);
  };

  // Calculate summary counts using .filter()
  const totalStudents = students.length;
  const totalPresent = students.filter((student) => student.status === 'Present').length;
  const totalAbsent = students.filter((student) => student.status === 'Absent').length;
  const attendanceRate = totalStudents > 0 ? Math.round((totalPresent / totalStudents) * 100) : 0;

  return (
    <div className="attendance-tracker-container">
      <div className="attendance-card">
        {/* Header Section */}
        <div className="attendance-header">
          <h2 className="attendance-title">🎓 Student Attendance Tracker</h2>
          <p className="attendance-subtitle">
            Manage and track daily student classroom attendance in real-time
          </p>
        </div>

        {/* Summary Statistics Bar */}
        <div className="summary-overview">
          <div className="summary-text-bar">
            <span><strong>Total Students:</strong> {totalStudents}</span>
            <span className="summary-divider">|</span>
            <span className="text-present"><strong>Present:</strong> {totalPresent}</span>
            <span className="summary-divider">|</span>
            <span className="text-absent"><strong>Absent:</strong> {totalAbsent}</span>
          </div>

          <div className="stats-grid">
            <div className="stat-box total-card">
              <div className="stat-label">Total Students</div>
              <div className="stat-value">{totalStudents}</div>
            </div>
            <div className="stat-box present-card">
              <div className="stat-label">Total Present</div>
              <div className="stat-value">{totalPresent}</div>
            </div>
            <div className="stat-box absent-card">
              <div className="stat-label">Total Absent</div>
              <div className="stat-value">{totalAbsent}</div>
            </div>
            <div className="stat-box rate-card">
              <div className="stat-label">Attendance Rate</div>
              <div className="stat-value">{attendanceRate}%</div>
            </div>
          </div>
        </div>

        {/* Quick Batch Action Buttons */}
        <div className="batch-actions">
          <button
            type="button"
            className="btn-batch btn-batch-present"
            onClick={() => handleMarkAll('Present')}
          >
            ✓ Mark All Present
          </button>
          <button
            type="button"
            className="btn-batch btn-batch-absent"
            onClick={() => handleMarkAll('Absent')}
          >
            ✗ Mark All Absent
          </button>
          <button
            type="button"
            className="btn-batch btn-batch-reset"
            onClick={handleReset}
          >
            ↺ Reset
          </button>
        </div>

        {/* Attendance Table */}
        <div className="table-responsive">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student.id}
                  className={`attendance-row ${student.status.toLowerCase()}-row`}
                >
                  <td className="col-id">{index + 1}</td>
                  <td className="col-name">
                    <div className="student-info">
                      <span className="student-avatar">{student.name.charAt(0)}</span>
                      <span className="student-name">{student.name}</span>
                    </div>
                  </td>
                  <td className="col-status">
                    <span className={`status-pill status-${student.status.toLowerCase()}`}>
                      <span className="status-dot"></span>
                      {student.status}
                    </span>
                  </td>
                  <td className="col-action">
                    <div className="action-buttons">
                      <button
                        type="button"
                        className={`btn-action btn-present ${
                          student.status === 'Present' ? 'active' : ''
                        }`}
                        onClick={() => handleStatusChange(student.id, 'Present')}
                      >
                        Present
                      </button>
                      <button
                        type="button"
                        className={`btn-action btn-absent ${
                          student.status === 'Absent' ? 'active' : ''
                        }`}
                        onClick={() => handleStatusChange(student.id, 'Absent')}
                      >
                        Absent
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Project2;
