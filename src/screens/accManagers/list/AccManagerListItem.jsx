import { useNavigate } from 'react-router-dom'
import {useAuth} from '../../../hooks'
import {ButtonDeleted} from "../../../components/atoms"

const AccManagerListItem = ({ accManager, accManagers, setAccManagers }) => {
  const navigate = useNavigate()

  const { auth } = useAuth()

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
        <td className='cursor-pointer'>
          {
            auth.role === "admin" &&
            <ButtonDeleted
             endpoint={"accManagers"}
             ID={accManager._id}
             setter={setAccManagers}
             items={accManagers}
            />
          }
        </td>
      </tr>
    </tbody>
  )
}

export default AccManagerListItem
