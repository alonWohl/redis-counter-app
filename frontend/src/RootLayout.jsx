import AppHeader from './components/AppHeader'

export default function RootLayout({ children }) {
	return (
		<div className="flex flex-col h-screen bg-zinc-900 text-zinc-50">
			<AppHeader />
			<main className="flex-1 p-4">{children}</main>
			{/* <AppFooter /> */}
		</div>
	)
}
