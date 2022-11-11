import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { dashboardData } from '../../helper/dashboardData'

const DashboardSidebar = () => {
  const navigate = useNavigate()
  return (
    <ul className='indent-6 text-white-100 bg-black-100 h-fit mt-9 rounded'>
      {dashboardData.map(({ title, route, icon }) => (
        <li
          key={title}
          className='font-bold text-white-50 hover:text-orange-50 border-3 border-b last:border-none border-gray-100 p-2 flex items-center cursor-pointer'
          onClick={() => navigate(`/app/${route}`)}
        >
          <Icon icon={icon} />
          <p className='ml-2'>{title}</p>
        </li>
      ))}
    </ul>
  )
}

export default DashboardSidebar
