function TaskCounter({ label, value, tone = 'neutral' }) { return <div className="summary-stat"><span className={`summary-icon summary-icon--${tone}`} aria-hidden="true" /><div><strong>{value}</strong><span>{label}</span></div></div> }
export default TaskCounter
