function UserAvatar({ user, warning = false, small = false }) { return <span className={`avatar ${small ? 'avatar--small' : ''} ${warning ? 'avatar--warning' : ''}`} title={user?.name}>{user?.avatar || '?'}{warning && <span className="avatar-warning" aria-label="Workload over threshold">!</span>}</span> }
export default UserAvatar
