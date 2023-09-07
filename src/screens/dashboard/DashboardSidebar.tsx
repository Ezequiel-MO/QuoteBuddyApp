import { FC, useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { IDashboardData, dashboardData } from '../../helper/dashboardData'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks'

const DashboardSidebar: FC = () => {
	const [dashboardDataList, setDashboardDataList] = useState<IDashboardData[]>(
		[]
	)
	let location = useLocation()

	const { auth } = useAuth()

	useEffect(() => {
		if (['/app/hotel', '/app/project'].includes(location.pathname)) {
			setDashboardDataList(
				dashboardData.slice(0, 6).concat(dashboardData.slice(7, 12))
			)
		} else if (location.pathname == '/app/invoice') {
			setDashboardDataList(dashboardData.slice(8, 9))
		} else if (
			location.pathname == '/app/accManager' &&
			auth.role === 'admin'
		) {
			setDashboardDataList(
				dashboardData.filter(
					(data) => data.route === 'accManager' || data.route === 'user'
				)
			)
		} else if (location.pathname == '/app/accManager') {
			setDashboardDataList(dashboardData.slice(6, 7))
		} else {
			setDashboardDataList(
				dashboardData.filter((data) => data.title !== 'Users')
			)
		}
	}, [])

	let activeStyle = {
		textDecoration: 'underline'
	}
	let activeClassName = 'underline'

	return (
		<ul className="indent-6 text-white-100 bg-black-100 h-fit mt-9 mr-5 rounded">
			{dashboardDataList?.map(({ title, route, icon }) => (
				<li
					key={title}
					className="font-bold text-white-50 hover:text-orange-50 border-3 border-b last:border-none border-gray-100 p-2 flex items-center cursor-pointer"
				>
					<NavLink
						className={`font-bold text-white-50 hover:text-orange-50  border-b last:border-none border-gray-100 flex items-center cursor-pointer `}
						style={({ isActive }) =>
							location.pathname == `/app/${route}` ? activeStyle : undefined
						}
						to={`/app/${route}`}
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
