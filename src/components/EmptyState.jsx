function EmptyState({ symbol = '∅', title, message }) {
  return (
    <div className="empty-state">
      <div className="empty-symbol">{symbol}</div>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  )
}

export default EmptyState
