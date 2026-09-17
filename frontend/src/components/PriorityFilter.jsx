function PriorityFilter({ value, onChange }) {
  return <div className="filter-bar"><span className="filter-label">Show priority</span><div className="filter-options">{['All', 'Low', 'Medium', 'High'].map((priority) => <button className={`filter-button ${value === priority ? 'is-active' : ''}`} key={priority} type="button" onClick={() => onChange(priority)}>{priority}</button>)}</div></div>
}
export default PriorityFilter
