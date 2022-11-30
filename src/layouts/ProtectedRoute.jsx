import { Outlet, Navigate, useLocation } from 'react-router-dom'
import Header from '../components/header/Header'
import useAuth from '../hooks/useAuth'
import DashboardSidebar from '../screens/dashboard/DashboardSidebar'
import Spinner from '../ui/spinner/Spinner'

const ProtectedRoute = () => {
  const { auth, loading } = useAuth()
  let location = useLocation()

  if (loading)
    return (
      <div className='h-screen flex justify-center items-center'>
        <Spinner />
      </div>
    )
  return (
    <div>
      {auth && auth._id ? (
        <div>
          <Header />
          <div className='flex flex-row'>
            {location.pathname !== '/app/project/schedule' && location.pathname !== '/app'  && (
              <nav className='min-w-fit ml-2'>
                <DashboardSidebar />
              </nav>
            )}
            <main className='w-full'>
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to='/' />
      )}
    </div>
  )
}

export default ProtectedRoute
