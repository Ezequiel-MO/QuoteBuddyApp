import { Outlet, Navigate } from 'react-router-dom'
import Header from '../components/header/Header'
import useAuth from '../hooks/useAuth'
import Spinner from '../ui/spinner/Spinner'

const ProtectedRoute = () => {
  const { auth, loading } = useAuth()
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
          <main>
            <Outlet />
          </main>
        </div>
      ) : (
        <Navigate to='/' />
      )}
    </div>
  )
}

export default ProtectedRoute
