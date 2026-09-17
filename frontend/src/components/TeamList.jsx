import UserAvatar from './UserAvatar.jsx'

function TeamList({ users, tasks, onAddUser }) {
  return <section className="team-section"><div className="section-title-row"><div><p className="section-kicker">People</p><h2>Team workload</h2></div><button className="button button--quiet" type="button" onClick={onAddUser}>+ Add user</button></div><div className="team-list">{users.map((user) => { const assigned = tasks.filter((task) => task.assignedUserId === user.id); const inProgress = assigned.filter((task) => task.status === 'in_progress').length; const warning = inProgress > 5; return <div className="team-member" key={user.id}><UserAvatar user={user} warning={warning} /><div className="member-name"><strong>{user.name}</strong><span>{assigned.length} assigned</span></div><div className={`workload ${warning ? 'workload--warning' : ''}`}><strong>{inProgress}</strong><span>in progress</span></div></div> })}</div></section>
}
export default TeamList
