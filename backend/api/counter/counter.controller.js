import redis from '../../redisClient.js'

async function incrementRequestMetric(endpoint) {
	try {
		await redis.incr(`requests:${endpoint}`)
	} catch (error) {
		console.error(`Failed to increment request metric for ${endpoint}:`, error)
	}
}

export async function incrementCounter(req, res) {
	try {
		const value = await redis.incr('counter')

		await incrementRequestMetric('/counter/increment')

		res.status(200).json({
			success: true,
			data: {
				count: value,
				message: 'Counter incremented successfully'
			},
			timestamp: new Date().toISOString()
		})
	} catch (error) {
		console.error('Increment counter error:', error)
		res.status(500).json({
			success: false,
			error: 'Failed to increment counter',
			message: error.message
		})
	}
}

export async function setOnceCounter(req, res) {
	try {
		const key = 'set-once-value'
		const defaultValue = 10

		const wasSet = await redis.setNX(key, defaultValue.toString())

		const currentValue = await redis.get(key)

		await incrementRequestMetric('/counter/set-once')

		res.status(200).json({
			success: true,
			data: {
				value: parseInt(currentValue),
				wasNewlySet: wasSet,
				message: wasSet ? 'Value set for first time' : 'Value already exists, returning existing value'
			},
			timestamp: new Date().toISOString()
		})
	} catch (error) {
		console.error('Set once counter error:', error)
		res.status(500).json({
			success: false,
			error: 'Failed to set counter',
			message: error.message
		})
	}
}

export async function getCounter(req, res) {
	try {
		const value = await redis.get('counter')
		res.status(200).json({
			success: true,
			data: {
				value: parseInt(value) || 0
			},
			timestamp: new Date().toISOString()
		})
	} catch (error) {
		console.error('Get counter error:', error)
		res.status(500).json({
			success: false,
			error: 'Failed to get counter',
			message: error.message
		})
	}
}

export async function getMetrics(req, res) {
	try {
		const [counterValue, setOnceValue, incrementRequests, setOnceRequests] = await Promise.all([
			redis.get('counter'),
			redis.get('set-once-value'),
			redis.get('requests:/counter/increment'),
			redis.get('requests:/counter/set-once')
		])

		res.status(200).json({
			success: true,
			data: {
				counter: {
					value: parseInt(counterValue) || 0,
					requestCount: parseInt(incrementRequests) || 0
				},
				setOnce: {
					value: setOnceValue ? parseInt(setOnceValue) : null,
					requestCount: parseInt(setOnceRequests) || 0
				}
			},
			timestamp: new Date().toISOString()
		})
	} catch (error) {
		console.error('Get metrics error:', error)
		res.status(500).json({
			success: false,
			error: 'Failed to get metrics',
			message: error.message
		})
	}
}
