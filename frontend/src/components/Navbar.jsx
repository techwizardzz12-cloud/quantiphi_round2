function Navbar({ onCreateTask }) {
  return <header className="navbar"><div className="brand"><span className="brand-mark">T</span><span>Taskflow</span></div><div className="nav-context"><span className="nav-dot" /> Product launch <span className="nav-divider">/</span> Q3 sprint</div><button className="button button--primary" type="button" onClick={onCreateTask}><span aria-hidden="true">+</span> Create task</button></header>
}
export default Navbar
