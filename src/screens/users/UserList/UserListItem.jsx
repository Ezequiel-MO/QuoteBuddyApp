import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { removeItemFromList } from '../../../helper/RemoveItemFromList'
import { useAuth } from '../../../hooks'

const UserListItem = ({ user, users, setUsers }) => {
    const navigate = useNavigate()
    const { auth } = useAuth()

    return (
        <tbody>
            <tr className='mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50'>
                <td
                    onClick={() =>
                        navigate(`/app/user/specs`, {
                            state: { user }
                        })
                    }
                    className='hover:text-blue-600 hover:underline cursor-pointer'
                >
                    {user.name || "Has no name"}
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className='cursor-pointer'>
                    {
                        auth.role === "admin" &&
                        <button
                            onClick={() =>
                                removeItemFromList(
                                    'users',
                                    user._id,
                                    setUsers,
                                    users
                                )
                            }
                        >
                            <Icon icon='fluent:delete-16-regular' color='#ea5933' />
                        </button>
                    }
                </td>
            </tr>
        </tbody>
    )
}

export default UserListItem