import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { accounting } from 'accounting'
import {useAuth} from '../../../hooks'
import {ButtonDeleted} from "../../../components/atoms"

const RestaurantListItem = ({
  restaurant,
  addRestaurantToProject,
  canBeAddedToProject,
  restaurants,
  setRestaurants
}) => {
  const navigate = useNavigate()

  const {auth} = useAuth()

  return (
    <tbody>
      <tr className='mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50'>
        <td
          onClick={() =>
            navigate(`/app/restaurant/specs`, {
              state: { restaurant }
            })
          }
          className='hover:text-blue-600 hover:underline cursor-pointer'
        >
          {restaurant.name}
        </td>
        <td>{restaurant.city}</td>
        <td>{accounting.formatMoney(restaurant.price, '€')}</td>
        <td>{restaurant.isVenue ? 'TRUE' : 'FALSE'}</td>
        <td className='cursor-pointer'>
          {
            auth.role === "admin" && 
            <ButtonDeleted
            endpoint={"restaurants"}
            ID={restaurant._id}
            setter={setRestaurants}
            items={restaurants} 
            />
          }
        </td>

        {canBeAddedToProject && (
          <td
            className='cursor-pointer flex flex-row items-center'
            onClick={() => addRestaurantToProject(restaurant)}
          >
            <Icon icon='gg:insert-after-o' color='#ea5933' width='30' />
            <span>Add to Project</span>
          </td>
        )}
      </tr>
    </tbody>
  )
}

export default RestaurantListItem
