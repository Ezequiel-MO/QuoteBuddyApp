import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'

const Signout = () => {
  const navigate = useNavigate()
  const signout = () => {
    localStorage.clear()
    navigate('/')
  }
  return (
    <div
      className='font-bold text-black-50 border-3 border-b border-gray-800 p-3 flex items-center cursor-pointer'
      onClick={signout}
    >
      <Icon icon='bx:log-out' />
      <p className='ml-2'>Sign Out</p>
    </div>
  )
}

export default Signout
