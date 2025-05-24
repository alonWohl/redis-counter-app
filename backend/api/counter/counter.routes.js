import { Router } from 'express'
import { incrementCounter, setOnceCounter, getCounter, getMetrics } from './counter.controller.js'

const router = Router()

router.get('/', getCounter)
router.get('/dashboard', getMetrics)

router.post('/increment', incrementCounter)
router.post('/set-once', setOnceCounter)

export const counterRouter = router
