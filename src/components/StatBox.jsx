function StatBox({ label, value, hint, accent = 'olive' }) {
  return (
    <div className={`stat-box stat-${accent}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      {hint && <small>{hint}</small>}
    </div>
  )
}

export default StatBox
