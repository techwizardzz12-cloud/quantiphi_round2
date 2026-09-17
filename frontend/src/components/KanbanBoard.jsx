import KanbanColumn from './KanbanColumn.jsx'

const columns = [{ value: 'todo', label: 'To-Do', tone: 'todo' }, { value: 'in_progress', label: 'In Progress', tone: 'progress' }, { value: 'done', label: 'Done', tone: 'done' }]

function KanbanBoard({ tasks, users, onStatusChange, onEdit, onDelete }) {
  return <div className="kanban-board">{columns.map((column) => <KanbanColumn key={column.value} column={column} tasks={tasks.filter((task) => task.status === column.value)} users={users} onStatusChange={onStatusChange} onEdit={onEdit} onDelete={onDelete} />)}</div>
}

export default KanbanBoard
