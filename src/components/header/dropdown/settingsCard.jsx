import { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks'
import Settings from './Settings'
import Signout from './Signout'
import { useGetAccManager } from '../../../hooks'

const SettingsCard = ({ setDropdownActive, dropdownActive }) => {
  const { auth } = useAuth()
  const {isLoading , accManager , setAccManager} = useGetAccManager(auth.email)
  const [foundAccManagers, setFoundAccManagers] = useState({})

  useEffect(() => {
    setFoundAccManagers(accManager)
  }, [accManager])

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
              {`${foundAccManagers.firstName} ${foundAccManagers.familyName}`}
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
