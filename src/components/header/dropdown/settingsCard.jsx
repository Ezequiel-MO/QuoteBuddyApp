import { useAuth } from '../../../hooks'
import Settings from './Settings'
import Signout from './Signout'
import useFetch from "../../../hooks/useFetch"

const SettingsCard = ({ setDropdownActive, dropdownActive }) => {
  const { auth } = useAuth()

  const { data: detailsData, loading: detailsLoading } = useFetch(  
    `${import.meta.env.VITE_BACKEND_URL}v1/accManagers?email=${auth.email}`
  )

  const firstName = (detailsLoading || detailsData.data === undefined || detailsData.data.data.length === 0)
   ? "" 
   : detailsData.data.data[0].firstName

  const familyName = (detailsLoading || detailsData.data === undefined || detailsData.data.data.length === 0)
   ? "" 
   : detailsData.data.data[0].familyName

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
              { firstName === "" ? "not exist this user in Account Manager" : `${firstName}  ${familyName}`}
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
