import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { removeItemFromList } from '../../../helper/RemoveItemFromList'

const AccManagerListItem = ({ accManager, accManagers, setAccManagers }) => {
  const navigate = useNavigate()

  return (
    <tbody>
      <tr className='mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50'>
        <td
          onClick={() =>
            navigate(`/app/accManager/specs`, {
              state: { accManager }
            })
          }
          className='hover:text-blue-600 hover:underline cursor-pointer'
        >
          {accManager.firstName}
        </td>
        <td>{accManager.familyName}</td>
        <td>{accManager.email}</td>
        <td
          className='cursor-pointer'
          onClick={() =>
            removeItemFromList(
              'accManagers',
              accManager._id,
              setAccManagers,
              accManagers
            )
          }
        >
          <Icon icon='fluent:delete-16-regular' color='#ea5933' />
        </td>
      </tr>
    </tbody>
  )
}

export default AccManagerListItem
