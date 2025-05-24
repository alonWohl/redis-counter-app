import { createClient } from 'redis'

const REDIS_USERNAME = process.env.REDIS_USERNAME
const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT
const REDIS_PASSWORD = process.env.REDIS_PASSWORD

const redis = createClient({
	username: 'alonWohl',
	password: '9c8gRTLNpC7Zq!G',
	socket: {
		host: 'redis-11725.crce177.me-south-1-1.ec2.redns.redis-cloud.com',
		port: 11725
	}
})

redis.on('error', err => {
	console.error('Redis Client Error:', err)
})

redis.on('connect', () => {
	console.log('Connected to Redis')
})

redis.on('ready', () => {
	console.log('Redis client ready')
})

redis.on('end', () => {
	console.log('Redis connection ended')
})

await redis.connect()

export default redis
