import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { counterRouter } from './api/counter/counter.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3030

if (process.env.NODE_ENV === 'production') {
	app.use(cors({ credentials: true }))
} else {
	app.use(
		cors({
			origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
			credentials: true
		})
	)
}

app.use(express.json())

app.use('/api/counter', counterRouter)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve('public')))

	app.get('/:catchall', (req, res) => {
		res.sendFile(path.resolve('public', 'index.html'))
	})

	app.get('/', (req, res) => {
		res.sendFile(path.resolve('public', 'index.html'))
	})
} else {
	app.get('/', (req, res) => {
		res.json({
			message: 'Redis Counter API is running!',
			environment: 'development'
		})
	})
}

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
	console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app
