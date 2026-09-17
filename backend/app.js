import express from 'express'
import cors from 'cors'
import taskRoutes from './routes/taskRoutes.js'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import { databaseMode } from './db/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

const app = express()
app.use(cors())
app.use(express.json())
app.get('/api/health', (_request, response) => response.json({ status: 'ok', database: databaseMode }))
app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use(notFound)
app.use(errorHandler)
export default app
