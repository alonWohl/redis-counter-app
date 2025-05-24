import { Link, useLocation } from 'react-router-dom'

export default function NavItem({ to, children }) {
	const { pathname } = useLocation()
	const isActive = pathname === to

	return (
		<Link
			to={to}
			className={`px-3 py-2 rounded transition-colors 
                  ${isActive ? 'text-lime-300' : 'text-zinc-50'}
                  hover:text-lime-200`}
		>
			{children}
		</Link>
	)
}
