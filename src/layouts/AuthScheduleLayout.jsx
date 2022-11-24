import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import ScheduleLayout from './ScheduleLayout'


const GeneralLayout = () => {
  return (
    <AuthProvider>
      <ScheduleLayout>
        <Outlet />
      </ScheduleLayout>
    </AuthProvider>
  )
}

export default GeneralLayout
