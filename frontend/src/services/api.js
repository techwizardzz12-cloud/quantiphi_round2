async function request(path, options = {}) {
  const response = await fetch(path, { headers: { 'Content-Type': 'application/json', ...options.headers }, ...options })
  if (!response.ok) { const body = await response.json().catch(() => ({})); throw new Error(body.message || 'Request failed') }
  return response.status === 204 ? null : response.json()
}
export const getTasks = () => request('/api/tasks')
export const createTask = (task) => request('/api/tasks', { method: 'POST', body: JSON.stringify(task) })
export const updateTask = (id, task) => request(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(task) })
export const deleteTask = (id) => request(`/api/tasks/${id}`, { method: 'DELETE' })
export const getUsers = () => request('/api/users')
export const createUser = (user) => request('/api/users', { method: 'POST', body: JSON.stringify(user) })
export const getProjects = () => request('/api/projects')
export const createProject = (project) => request('/api/projects', { method: 'POST', body: JSON.stringify(project) })
