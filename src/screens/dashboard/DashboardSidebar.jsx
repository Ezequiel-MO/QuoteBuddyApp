import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { dashboardData } from '../../helper/dashboardData'

const DashboardSidebar = () => {
  const navigate = useNavigate()
  return (
    <ul className='indent-6 text-white-100 bg-black-100 h-fit mt-9 rounded'>
      {dashboardData.map(({ title, route, icon }) => (
        <li
          className='font-bold text-white-50 hover:text-orange-50 border-3 border-b last:border-none border-gray-100 p-2 flex items-center cursor-pointer'
          onClick={() => navigate(`/app/${route}`)}
        >
          <Icon icon={icon} />
          <p className='ml-2'>{title}</p>
        </li>
        /*  <li
          key={title}
          onClick={() => navigate(`/app/${route}`)}
          className="uppercase hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer"
        >
          {title}
        </li> */
      ))}
    </ul>
  )
}

export default DashboardSidebar
