import { TicketsNav } from '@screens/tickets/TicketsNav'
import { Outlet } from 'react-router-dom'

export const TicketRoutes = () => {
	return (
		<>
			<TicketsNav />
			<Outlet />
		</>
	)
}
