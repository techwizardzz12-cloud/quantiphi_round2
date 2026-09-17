import { Router } from 'express'
import { createTask, deleteTask, getTask, listTasks, updateTask } from '../controllers/taskController.js'

const router = Router()
router.get('/', listTasks)
router.get('/:id', getTask)
router.post('/', createTask)
router.put('/:id', updateTask)
router.patch('/:id', updateTask)
router.delete('/:id', deleteTask)
export default router
