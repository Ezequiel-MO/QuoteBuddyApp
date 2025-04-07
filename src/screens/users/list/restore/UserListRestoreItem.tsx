import { FC, useState } from 'react'
import { IUser } from '@interfaces/user'
import { listStyles } from 'src/constants/listStyles'
import { Icon } from '@iconify/react'
import { formatDate } from 'src/helper/formatDate'
import baseAPI from 'src/axios/axiosConfig'
import { MenuRestoreActions } from 'src/components/atoms/modal/menu/MenuRestoreActions'
import { UserDetailModal } from './modal/UserDetailModal'

interface UserListRestoreItemProps {
    user: IUser
    users: IUser[] | undefined
    setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
}

export const UserListRestoreItem: FC<UserListRestoreItemProps> = ({
    user,
    users,
    setUsers,
}) => {

    const [openModal, setOpenModal] = useState(false)

    const handleViewDetails = () => {
        setOpenModal(true)
    }

    const handleRestore = async (userId: string) => {
        await baseAPI.patch(`users/isDeleted/true/${user._id}`)
        const updatedUsers = users?.filter((el) => el._id !== userId)
        if (updatedUsers) {
            setUsers(updatedUsers)
        }
    }

    const handleDelete = async (userId: string) => {
        await baseAPI.delete(`users/isDeleted/true/${userId}`)
        const updatedUsers = users?.filter((el) => el._id !== userId)
        if (updatedUsers) {
            setUsers(updatedUsers)
        }
    }

    return (
        <tbody>
            <tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
                <td
                    className={`${listStyles.td} hover:text-blue-600 hover:underline flex items-center`}
                >
                    <Icon
                        icon="fluent:delete-arrow-back-16-regular"
                        width={20}
                        className="mr-1"
                    />
                    {user.name || 'Has no name'}
                </td>
                <td className={listStyles.td}>
                    {user.email}
                </td>
                <td className={listStyles.td}>
                    {user.role}
                </td>
                <td className={`${listStyles.td} text-red-500`}>
                    {user?.deletedAt ? formatDate(user?.deletedAt) : ''}
                </td>
                <td className={listStyles.td}>
                    <UserDetailModal  user={user} open={openModal} setOpen={setOpenModal}/>
                    <MenuRestoreActions
                        item={user}
                        itemType="User"
                        onViewDetails={handleViewDetails}
                        onRestore={(userId) => handleRestore(userId)}
                        onDelete={(userId) => handleDelete(userId)}
                        key={user._id}
                    />
                </td>
            </tr>
        </tbody>
    )
}