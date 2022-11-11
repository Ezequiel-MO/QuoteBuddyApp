import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'

const Settings = () => {
  const navigate = useNavigate()

  return (
    <div
      className='font-bold text-black-50 border-3 border-b border-gray-800 p-3 flex items-center cursor-pointer'
      onClick={() => navigate('/app/settings')}
    >
      <Icon icon='material-symbols:settings' />
      <p className='ml-2'>Settings</p>
    </div>
  )
}

export default Settings
