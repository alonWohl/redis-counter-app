import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import RootLayout from './RootLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
	return (
		<BrowserRouter>
			<RootLayout>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/dashboard" element={<DashboardPage />} />
				</Routes>
			</RootLayout>
		</BrowserRouter>
	)
}

export default App
