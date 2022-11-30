import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { dashboardData } from '../../helper/dashboardData'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const DashboardSidebar = () => {
  const [dashboardDataList, setDashboardDataList] = useState([])
  const navigate = useNavigate()
  let location = useLocation()

  useEffect(() => {
    if (
      location.pathname == '/app/dashboard' ||
      location.pathname == '/app/hotel' ||
      location.pathname == '/app/project'
    ) {
      setDashboardDataList(
        dashboardData.slice(0, 5).concat(dashboardData.slice(7, 9))
      )
    } else if (location.pathname == '/app/invoice') {
      setDashboardDataList(dashboardData.slice(8, 9))
    } else if (location.pathname == '/app/accManager') {
      setDashboardDataList(dashboardData.slice(6, 7))
    } else {
      setDashboardDataList(dashboardData)
    }
    console.log(dashboardDataList.length)
  }, [])

  let activeStyle = {
    textDecoration: 'underline'
  }
  let activeClassName = 'underline'

  return (
    <ul className='indent-6 text-white-100 bg-black-100 h-fit mt-9 mr-5 rounded'>
      {dashboardDataList?.map(({ title, route, icon }) => (
        <li
          onClick={() => navigate(`/app/${route}`)}
          className='font-bold text-white-50 hover:text-orange-50 border-3 border-b last:border-none border-gray-100 p-2 flex items-center cursor-pointer'
        >
          <NavLink
            key={title}
            className={`font-bold text-white-50 hover:text-orange-50  border-b last:border-none border-gray-100 flex items-center cursor-pointer `}
            style={({ isActive }) =>
              location.pathname == `/app/${route}` ? activeStyle : undefined
            }
          >
            <Icon icon={icon} />
            <p className='ml-2'>{title}</p>
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default DashboardSidebar
