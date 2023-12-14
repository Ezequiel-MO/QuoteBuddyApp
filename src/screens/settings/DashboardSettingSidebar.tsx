import { FC, useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import {
	IDashboardData,
	dashboardDataSettings
} from '../../constants/dashboardData'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth/useAuth'

export const DashboardSettingSidebar: FC = () => {
	const [dashboardDataList, setDashboardDataList] = useState<IDashboardData[]>(
		[]
	)
	let location = useLocation()
	const { auth } = useAuth()

	useEffect(() => {
		if (auth.role === 'admin') {
			setDashboardDataList(dashboardDataSettings)
		}
	}, [])

	return (
		<ul className="indent-6 text-white-100 bg-black-100 h-screen mt-9 mr-5 rounded">
			<label>Company features</label>
			{dashboardDataList?.map(({ title, route, icon }) => (
				<li
					key={title}
					className="font-bold text-white-50 hover:text-orange-50 border-3 border-b last:border-none border-gray-100 p-2 flex items-center cursor-pointer"
				>
					<NavLink
						className={`font-bold text-white hover:text-orange-500 border-b last:border-none border-gray-100 flex items-center cursor-pointer ${
							location.pathname == `/app/${route}` ? 'active-styles' : ''
						}`}
						to={`/app/${route}`}
					>
						<Icon icon={icon} style={{ fontSize: '22px' }} />
						<p className="text-sm -ml-4">{title}</p>
					</NavLink>
				</li>
			))}
		</ul>
	)
}
