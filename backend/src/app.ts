import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
import taskRoutes from './routes/taskRoutes'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.get('/', (_req, res) => {
  res.json({ message: 'API funcionando' })
})

export default app
