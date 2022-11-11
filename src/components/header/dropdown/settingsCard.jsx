import useAuth from '../../../hooks/useAuth'
import Settings from './Settings'
import Signout from './Signout'

const SettingsCard = ({ setDropdownActive, dropdownActive }) => {
  const { auth } = useAuth()

  return (
    <div
      onMouseLeave={() => setDropdownActive(false)}
      className={`${
        dropdownActive ? 'block' : 'hidden'
      } absolute top-20 right-10 bg-white-100`}
    >
      <div>
        <div className='font-bold text-black-50 border-3 border-b border-gray-500 p-3'>
          <p>
            Hello,{' '}
            <span className='text-orange-500'>
              {localStorage.getItem('user_name') || auth.name}
            </span>
          </p>
        </div>
        <Settings />
        <Signout />
      </div>
    </div>
  )
}

export default SettingsCard
