import { store } from '../db/db.js'

const priorities = new Set(['Low', 'Medium', 'High'])
const statuses = new Set(['todo', 'in_progress', 'done'])

function validate(input, partial = false) {
  if (!partial && !input.title?.trim()) return 'Title is required'
  if (!partial && !priorities.has(input.priority)) return 'Priority must be Low, Medium, or High'
  if (!partial && !statuses.has(input.status)) return 'Status is invalid'
  if (input.priority !== undefined && !priorities.has(input.priority)) return 'Priority is invalid'
  if (input.status !== undefined && !statuses.has(input.status)) return 'Status is invalid'
  return null
}

export async function listTasks(_request, response, next) { try { response.json(await store.listTasks()) } catch (error) { next(error) } }
export async function getTask(request, response, next) { try { const task = await store.getTask(Number(request.params.id)); if (!task) return response.status(404).json({ message: 'Task not found' }); response.json(task) } catch (error) { next(error) } }
export async function createTask(request, response, next) { try { const message = validate(request.body); if (message) return response.status(400).json({ message }); const user = request.body.assignedUserId ? await store.getUser(Number(request.body.assignedUserId)) : null; if (request.body.assignedUserId && !user) return response.status(400).json({ message: 'Assigned user not found' }); response.status(201).json(await store.createTask(request.body)) } catch (error) { next(error) } }
export async function updateTask(request, response, next) { try { const message = validate(request.body, true); if (message) return response.status(400).json({ message }); if (request.body.assignedUserId) { const user = await store.getUser(Number(request.body.assignedUserId)); if (!user) return response.status(400).json({ message: 'Assigned user not found' }) } const current = await store.getTask(Number(request.params.id)); if (!current) return response.status(404).json({ message: 'Task not found' }); response.json(await store.updateTask(current.id, { ...current, ...request.body })) } catch (error) { next(error) } }
export async function deleteTask(request, response, next) { try { const deleted = await store.deleteTask(Number(request.params.id)); if (!deleted) return response.status(404).json({ message: 'Task not found' }); response.status(204).send() } catch (error) { next(error) } }
