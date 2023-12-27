import { FC, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { IDashboardData } from '../../constants/dashboardData'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth/useAuth'
import { getFilteredDashboardData } from 'src/helper/getFilteredDashboardData'

const DashboardSidebar: FC = () => {
	const [filteredDashboardData, setFilteredDashboardData] = useState<
		IDashboardData[]
	>([])
	const location = useLocation()
	const { auth } = useAuth()

	useEffect(() => {
		setFilteredDashboardData(
			getFilteredDashboardData(location.pathname, auth.role)
		)
	}, [location.pathname, auth.role])

	return (
		<ul className="indent-6 text-white-100 bg-black-100 h-screen mt-9 mr-5 rounded">
			{filteredDashboardData.map(({ title, route, icon }) => (
				<li
					key={title}
					className="font-bold text-white-50 hover:text-orange-50 border-3 border-b last:border-none border-gray-100 p-2 flex items-center cursor-pointer truncate hover:text-clip"
				>
					<NavLink
						to={`/app/${route}`}
						className="font-bold text-white-50 hover:text-orange-50 border-b last:border-none border-gray-100 flex items-center cursor-pointer"
						style={({ isActive }) =>
							isActive ? { textDecoration: 'underline' } : undefined
						}
					>
						<Icon icon={icon} />
						<p className="ml-2">{title}</p>
					</NavLink>
				</li>
			))}
		</ul>
	)
}

export default DashboardSidebar
