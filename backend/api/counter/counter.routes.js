import { Router } from 'express'
import { incrementCounter, setOnceCounter, getCounter, getMetrics } from './counter.controller.js'

const router = Router()

router.post('/increment', incrementCounter)

router.post('/set-once', setOnceCounter)

router.get('/', getCounter)
router.get('/dashboard', getMetrics)

export const counterRouter = router
