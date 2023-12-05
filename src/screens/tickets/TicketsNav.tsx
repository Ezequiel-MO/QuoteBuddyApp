import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

export const TicketsNav = () => {
	return (
		<nav className="flex justify-between bg-gray-800 p-4">
			<div className="flex items-center space-x-4">
				<Link to="/app/tickets">
					<Icon icon="ic:outline-home" width={24} />
				</Link>
				<Link to="/app/tickets/new">
					<Icon icon="ph:ticket" width={24} />
				</Link>
			</div>
			<div>
				<p className=" text-default-text">oliver@cutt.events</p>
			</div>
		</nav>
	)
}
