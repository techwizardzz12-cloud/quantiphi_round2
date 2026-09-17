import { Router } from 'express'
import { createProject, getProject, listProjects } from '../controllers/projectController.js'

const router = Router()
router.get('/', listProjects)
router.get('/:id', getProject)
router.post('/', createProject)
export default router
