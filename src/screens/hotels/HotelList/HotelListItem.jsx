import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import {useAuth} from '../../../hooks'
import {ButtonDeleted} from "../../../components/atoms"

const HotelListItem = ({ hotel, canBeAddedToProject, hotels, setHotels }) => {
  const navigate = useNavigate()

  const {auth} = useAuth()

  const addHotelToProject = () => {
    navigate(`/app/hotel/${hotel._id}`, {
      state: { hotelName: hotel.name }
    })
  }

  return (
    <tbody>
      <tr className='mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50'>
        <td
          onClick={() =>
            navigate(`/app/hotel/specs`, {
              state: { hotel }
            })
          }
          className='hover:text-blue-600 hover:underline cursor-pointer'
        >
          {hotel.name}
        </td>
        <td>{`${hotel.numberStars} stars`}</td>
        <td>{hotel.address}</td>
        <td>{`${hotel.numberRooms} rooms`}</td>
        <td>{`${hotel.meetingRooms ?? ''} meeting rooms`}</td>
        <td>{`${hotel.city ?? ''} `}</td>
        <td className='cursor-pointer'>
          {
            auth.role === "admin" &&
            <ButtonDeleted
            endpoint={"hotels"}
            ID={hotel._id}
            setter={setHotels}
            items={hotels}  
            />
          }
        </td>

        {canBeAddedToProject && (
          <td
            className='flex flex-row items-center cursor-pointer'
            onClick={addHotelToProject}
          >
            <Icon icon='gg:insert-after-o' color='#ea5933' width='35' />
            <span>Add to Project</span>
          </td>
        )}
      </tr>
    </tbody>
  )
}

export default HotelListItem
