import { useState } from 'react'
import { incrementCounter, setOnceCounter } from '../api/counter.service'

export default function HomePage() {
	const [incrementResult, setIncrementResult] = useState(null)
	const [setOnceResult, setSetOnceResult] = useState(null)
	const [isIncrementLoading, setIsIncrementLoading] = useState(false)
	const [isSetOnceLoading, setIsSetOnceLoading] = useState(false)
	const [error, setError] = useState(null)

	async function handleIncrement() {
		try {
			setIsIncrementLoading(true)
			setError(null)
			const response = await incrementCounter()
			setIncrementResult(response.data)
		} catch (err) {
			setError(err.message || 'Failed to increment counter')
		} finally {
			setIsIncrementLoading(false)
		}
	}

	async function handleSetOnce() {
		try {
			setIsSetOnceLoading(true)
			setError(null)
			const response = await setOnceCounter()
			setSetOnceResult(response.data)
		} catch (err) {
			setError(err.message || 'Failed to set counter')
		} finally {
			setIsSetOnceLoading(false)
		}
	}

	return (
		<div className="max-w-2xl mx-auto">
			<h1 className="text-3xl font-bold mb-6">Redis Counter App</h1>

			{error && (
				<div className="p-4 mb-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-md">
					<p className="text-red-400">{error}</p>
				</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="p-6 bg-zinc-800 rounded-lg">
					<h2 className="text-xl font-semibold mb-4">Increment Counter</h2>
					<p className="mb-4 text-zinc-400">Increments a counter stored in Redis by 1 each time it's called.</p>
					<button
						onClick={handleIncrement}
						disabled={isIncrementLoading}
						className="px-4 py-2 bg-lime-500 rounded-md hover:bg-lime-600 text-zinc-700 transition-colors disabled:opacity-50"
					>
						{isIncrementLoading ? 'Loading...' : 'Increment Counter'}
					</button>

					{incrementResult && (
						<div className="mt-4 p-3 bg-zinc-700 rounded-md">
							<p>
								Current count: <span className="font-mono font-bold">{incrementResult.count}</span>
							</p>
							<p className="text-sm text-zinc-400 mt-1">{incrementResult.message}</p>
						</div>
					)}
				</div>

				<div className="p-6 bg-zinc-800 rounded-lg">
					<h2 className="text-xl font-semibold mb-4">Set-Once Counter</h2>
					<p className="mb-4 text-zinc-400">Sets a predefined value in Redis only if it doesn't already exist.</p>
					<button
						onClick={handleSetOnce}
						disabled={isSetOnceLoading}
						className="px-4 py-2 bg-zinc-900 text-zinc-100 border border-lime-500 rounded-md hover:bg-lime-800 transition-colors disabled:opacity-50"
					>
						{isSetOnceLoading ? 'Loading...' : 'Set Once Value'}
					</button>

					{setOnceResult && (
						<div className="mt-4 p-3 bg-zinc-700 rounded-md">
							<p>
								Value: <span className="font-mono font-bold">{setOnceResult.value}</span>
							</p>
							<p className="text-sm text-zinc-400 mt-1">{setOnceResult.wasNewlySet ? 'Value was set for the first time' : 'Value was already set, returning existing value'}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
