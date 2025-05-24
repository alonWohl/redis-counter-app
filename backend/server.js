import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { counterRouter } from './api/counter/counter.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3030

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve('public')))
} else {
	const corsOptions = {
		origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://localhost:5173'],
		credentials: true
	}
	app.use(cors(corsOptions))
}

app.use(express.json())

app.use('/api/counter', counterRouter)

app.listen(PORT, () => {
	console.log(`Server is running on port http://localhost:${PORT}`)
})

export default app
