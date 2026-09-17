import pg from 'pg'
import tasks, { projects, users } from '../data/tasks.js'

const { Pool } = pg
const pool = process.env.DATABASE_URL ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }) : null

const memory = { tasks, users, projects }
const clone = (value) => JSON.parse(JSON.stringify(value))

export const store = {
  async listTasks() {
    if (pool) {
      const result = await pool.query('SELECT id, project_id AS "projectId", title, description, priority, due_date AS "dueDate", status, assigned_user_id AS "assignedUserId", created_at AS "createdAt", updated_at AS "updatedAt" FROM tasks ORDER BY id')
      return result.rows
    }
    return clone(memory.tasks)
  },
  async getTask(id) { return (await this.listTasks()).find((task) => task.id === id) },
  async createTask(input) {
    const now = new Date().toISOString()
    if (pool) {
      const result = await pool.query('INSERT INTO tasks (project_id, title, description, priority, status, due_date, assigned_user_id, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$8) RETURNING id, project_id AS "projectId", title, description, priority, due_date AS "dueDate", status, assigned_user_id AS "assignedUserId", created_at AS "createdAt", updated_at AS "updatedAt"', [input.projectId || 1, input.title, input.description || '', input.priority, input.status, input.dueDate || null, input.assignedUserId || null, now])
      return result.rows[0]
    }
    const task = { ...input, id: Math.max(0, ...memory.tasks.map((item) => item.id)) + 1, projectId: input.projectId || 1, createdAt: now, updatedAt: now }
    memory.tasks.push(task)
    return clone(task)
  },
  async updateTask(id, input) {
    const task = await this.getTask(id)
    if (!task) return null
    if (pool) {
      const result = await pool.query('UPDATE tasks SET title=$1, description=$2, priority=$3, status=$4, due_date=$5, assigned_user_id=$6, updated_at=$7 WHERE id=$8 RETURNING id, project_id AS "projectId", title, description, priority, due_date AS "dueDate", status, assigned_user_id AS "assignedUserId", created_at AS "createdAt", updated_at AS "updatedAt"', [input.title, input.description || '', input.priority, input.status, input.dueDate || null, input.assignedUserId || null, new Date().toISOString(), id])
      return result.rows[0] || null
    }
    Object.assign(task, input, { updatedAt: new Date().toISOString() })
    return clone(task)
  },
  async deleteTask(id) {
    if (pool) return (await pool.query('DELETE FROM tasks WHERE id=$1', [id])).rowCount > 0
    const index = memory.tasks.findIndex((task) => task.id === id)
    if (index < 0) return false
    memory.tasks.splice(index, 1)
    return true
  },
  async listUsers() { return pool ? (await pool.query('SELECT id, name, avatar, created_at AS "createdAt" FROM users ORDER BY id')).rows : clone(memory.users) },
  async getUser(id) { return (await this.listUsers()).find((user) => user.id === id) },
  async createUser(name) {
    const now = new Date().toISOString()
    const avatar = name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()
    if (pool) return (await pool.query('INSERT INTO users (name, avatar, created_at) VALUES ($1,$2,$3) RETURNING id, name, avatar, created_at AS "createdAt"', [name, avatar, now])).rows[0]
    const user = { id: Math.max(0, ...memory.users.map((item) => item.id)) + 1, name, avatar, createdAt: now }
    memory.users.push(user)
    return clone(user)
  },
  async listProjects() { return pool ? (await pool.query('SELECT id, name, created_at AS "createdAt" FROM projects ORDER BY id')).rows : clone(memory.projects) },
  async getProject(id) { return (await this.listProjects()).find((project) => project.id === id) },
  async createProject(name) {
    const now = new Date().toISOString()
    if (pool) return (await pool.query('INSERT INTO projects (name, created_at) VALUES ($1,$2) RETURNING id, name, created_at AS "createdAt"', [name, now])).rows[0]
    const project = { id: Math.max(0, ...memory.projects.map((item) => item.id)) + 1, name, createdAt: now }
    memory.projects.push(project)
    return clone(project)
  },
}

export const databaseMode = pool ? 'neon-postgres' : 'in-memory'
