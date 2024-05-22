import React from 'react'
import { ButtonDeleteWithAuth } from '../../../components/atoms'
import { IUser } from '@interfaces/user'

interface UserListItemProps {
	user: IUser
	users: IUser[] | undefined
	setUsers: React.Dispatch<React.SetStateAction<IUser[]>>
	handleNavigate: (user: IUser) => void
}

const UserListItem: React.FC<UserListItemProps> = ({
	user,
	users,
	setUsers,
	handleNavigate
}) => {
	return (
		<tbody>
			<tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
				<td
					onClick={() => handleNavigate(user)}
					className="hover:text-blue-600 hover:underline cursor-pointer"
				>
					{user.name || 'Has no name'}
				</td>
				<td>{user.email}</td>
				<td>{user.role}</td>
				<td className="cursor-pointer">
					<ButtonDeleteWithAuth
						endpoint={'users'}
						ID={user._id as string}
						setter={setUsers}
						items={users || []}
					/>
				</td>
			</tr>
		</tbody>
	)
}

export default UserListItem
