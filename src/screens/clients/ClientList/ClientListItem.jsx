import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { removeItemFromList } from '../../../helper/RemoveItemFromList'

const ClientListItem = ({ client, clients, setClients }) => {
  const navigate = useNavigate()

  return (
    <tbody>
      <tr className='mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50'>
        <td
          onClick={() =>
            navigate(`/app/client/specs`, {
              state: { client }
            })
          }
          className='hover:text-blue-600 hover:underline cursor-pointer'
        >{`${client.firstName} ${client.familyName}`}</td>
        <td>{client.email}</td>
        <td>{client.clientCompany}</td>
        <td>{client.country}</td>
        <td
          className='cursor-pointer'
          onClick={() =>
            removeItemFromList('clients', client._id, setClients, clients)
          }
        >
          <Icon icon='fluent:delete-16-regular' color='#ea5933' />
        </td>
      </tr>
    </tbody>
  )
}

export default ClientListItem
