import express from 'express'
const app = express()
import dotenv from 'dotenv'
import colors from 'colors'
import helmet from 'helmet'
import morgan from 'morgan'

import connectDB from './config/db.js'

//Routes
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

connectDB()

//Middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
})
