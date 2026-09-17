import { Router } from 'express'
import { createUser, getUser, listUsers } from '../controllers/userController.js'

const router = Router()
router.get('/', listUsers)
router.get('/:id', getUser)
router.post('/', createUser)
export default router
