import { useState, useEffect } from 'react'
import { getDashboard } from '../api/counter.service'

export default function DashboardPage() {
	const [metrics, setMetrics] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	const fetchMetrics = async () => {
		try {
			setIsLoading(true)
			const response = await getDashboard()
			setMetrics(response.data)
			setError(null)
		} catch (err) {
			setError(err.message || 'Failed to load metrics')
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchMetrics()

		// Refresh metrics every 5 seconds
		const intervalId = setInterval(fetchMetrics, 5000)

		return () => clearInterval(intervalId)
	}, [])

	if (isLoading && !metrics) {
		return (
			<div className="flex justify-center items-center h-full">
				<p className="text-xl">Loading metrics...</p>
			</div>
		)
	}

	if (error) {
		return (
			<div className="max-w-2xl mx-auto">
				<div className="p-4 mb-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-md">
					<p className="text-red-400">{error}</p>
					<button onClick={fetchMetrics} className="mt-2 px-3 py-1 bg-red-800 hover:bg-red-700 rounded-md text-sm">
						Try Again
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className="max-w-3xl mx-auto">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Redis Metrics Dashboard</h1>
				<button onClick={fetchMetrics} className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 rounded-md text-sm flex items-center gap-1">
					<span>Refresh</span>
					{isLoading && <span className="animate-spin">↻</span>}
				</button>
			</div>

			{metrics && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="p-6 bg-zinc-800 rounded-lg">
						<h2 className="text-xl font-semibold mb-4 flex items-center">
							<span className="mr-2">Counter Metrics</span>
							<span className="px-2 py-1 text-xs bg-blue-600 rounded-full">Increment</span>
						</h2>

						<div className="grid grid-cols-2 gap-4">
							<div className="p-4 bg-zinc-700 rounded-md">
								<p className="text-sm text-zinc-400">Current Value</p>
								<p className="text-2xl font-bold font-mono">{metrics.counter.value}</p>
							</div>

							<div className="p-4 bg-zinc-700 rounded-md">
								<p className="text-sm text-zinc-400">API Calls</p>
								<p className="text-2xl font-bold font-mono">{metrics.counter.requestCount}</p>
							</div>
						</div>
					</div>

					<div className="p-6 bg-zinc-800 rounded-lg">
						<h2 className="text-xl font-semibold mb-4 flex items-center">
							<span className="mr-2">Set-Once Metrics</span>
							<span className="px-2 py-1 text-xs bg-purple-600 rounded-full">Idempotent</span>
						</h2>

						<div className="grid grid-cols-2 gap-4">
							<div className="p-4 bg-zinc-700 rounded-md">
								<p className="text-sm text-zinc-400">Stored Value</p>
								<p className="text-2xl font-bold font-mono">{metrics.setOnce.value !== null ? metrics.setOnce.value : <span className="text-zinc-500">Not set</span>}</p>
							</div>

							<div className="p-4 bg-zinc-700 rounded-md">
								<p className="text-sm text-zinc-400">API Calls</p>
								<p className="text-2xl font-bold font-mono">{metrics.setOnce.requestCount}</p>
							</div>
						</div>
					</div>
				</div>
			)}

			{metrics && (
				<div className="mt-8 p-4 bg-zinc-800 rounded-lg">
					<h2 className="text-lg font-semibold mb-2">Last Updated</h2>
					<p className="text-zinc-400">{new Date().toLocaleTimeString()}</p>
					<p className="text-xs text-zinc-500 mt-1">Data refreshes automatically every 5 seconds</p>
				</div>
			)}
		</div>
	)
}
