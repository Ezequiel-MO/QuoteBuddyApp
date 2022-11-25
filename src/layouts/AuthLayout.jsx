import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'

const AuthLayout = () => {
  return (
    <>
      <main className='container mx-auto mt-4 md:mt-15 p-5 md:flex md:justify-center'>
        <div className='md:w-2/3 lg:w-2/5'>
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </div>
      </main>
    </>
  )
}

export default AuthLayout
