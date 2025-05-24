import { Link } from 'react-router-dom'
import NavItem from './NavItem'

export default function AppHeader() {
	return (
		<header className="flex items-center justify-between p-4 bg-zinc-800">
			<Link to="/">
				<h1 className="text-2xl font-bold">syncz.io</h1>
			</Link>
			<nav>
				<ul className="flex items-center gap-4">
					<li className="">
						<NavItem to="/">Home</NavItem>
					</li>
					<li className="">
						<NavItem to="/dashboard">Dashboard</NavItem>
					</li>
				</ul>
			</nav>
		</header>
	)
}
