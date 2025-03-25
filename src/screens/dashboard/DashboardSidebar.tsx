import { FC, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { IDashboardData } from '../../constants/dashboardData'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { getFilteredDashboardData } from 'src/helper/getFilteredDashboardData'
import { useNavigationLoader } from 'src/hooks'
import { Spinner } from '@components/atoms'
import { useAuth } from 'src/context/auth/AuthProvider'

const DashboardSidebar: FC = () => {
	const [filteredDashboardData, setFilteredDashboardData] = useState<
		IDashboardData[]
	>([])
	const location = useLocation()
	const { auth } = useAuth()
	const { isLoading } = useNavigationLoader()

	useEffect(() => {
		setFilteredDashboardData(
			getFilteredDashboardData(location.pathname, auth.role || 'user')
		)
	}, [location.pathname, auth.role])

	return (
		<ul className="">
			{isLoading ? (
				<Spinner />
			) : (
				filteredDashboardData.map(({ title, route, icon }) => (
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
							<p className="ml-2 hidden sm:block text-[16px]">{title}</p>
						</NavLink>
					</li>
				))
			)}
		</ul>
	)
}

export default DashboardSidebar
