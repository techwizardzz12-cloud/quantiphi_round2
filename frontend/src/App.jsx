import { useEffect, useState } from 'react'
import Dashboard from './pages/Dashboard.jsx'
import Navbar from './components/Navbar.jsx'
import TaskModal from './components/TaskModal.jsx'
import { createTask, createUser, deleteTask, getTasks, getUsers, updateTask } from './services/api.js'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('All')
  const [modal, setModal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => { Promise.all([getTasks(), getUsers()]).then(([loadedTasks, loadedUsers]) => { setTasks(loadedTasks); setUsers(loadedUsers) }).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false)) }, [])
  async function saveTask(task) { try { const saved = modal.task ? await updateTask(modal.task.id, task) : await createTask(task); setTasks((current) => modal.task ? current.map((item) => item.id === saved.id ? saved : item) : [...current, saved]); setModal(null); setError('') } catch (requestError) { setError(requestError.message) } }
  async function moveTask(id, status) { const previous = tasks; setTasks((current) => current.map((task) => task.id === id ? { ...task, status } : task)); try { const saved = await updateTask(id, { ...tasks.find((task) => task.id === id), status }); setTasks((current) => current.map((task) => task.id === saved.id ? saved : task)) } catch (requestError) { setTasks(previous); setError(requestError.message) } }
  async function removeTask(id) { if (!window.confirm('Delete this task?')) return; try { await deleteTask(id); setTasks((current) => current.filter((task) => task.id !== id)) } catch (requestError) { setError(requestError.message) } }
  async function saveUser(user) { try { const saved = await createUser(user); setUsers((current) => [...current, saved]); setModal(null) } catch (requestError) { setError(requestError.message) } }
  return <div className="app-shell"><Navbar onCreateTask={() => setModal({})} />{loading ? <div className="page-state">Loading your workspace...</div> : error && !tasks.length ? <div className="page-state page-state--error"><strong>Could not connect to the workspace.</strong><span>{error} Start the backend with <code>npm run server</code>.</span></div> : <><Dashboard tasks={tasks} users={users} filter={filter} onFilter={setFilter} onStatusChange={moveTask} onEdit={(task) => setModal({ task })} onDelete={removeTask} onCreateTask={() => setModal({})} onAddUser={() => setModal({ mode: 'user' })} />{error && <button className="error-toast" type="button" onClick={() => setError('')}>{error} ×</button>}</>}{modal && <TaskModal task={modal.task} users={users} mode={modal.mode} onClose={() => setModal(null)} onSave={modal.mode === 'user' ? saveUser : saveTask} />}</div>
}

export default App
