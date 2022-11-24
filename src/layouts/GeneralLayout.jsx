import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import ProtectedRoute from './ProtectedRoute'


const GeneralLayout = () => {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    </AuthProvider>
  )
}

export default GeneralLayout
