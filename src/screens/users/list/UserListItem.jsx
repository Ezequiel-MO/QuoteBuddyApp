import { useNavigate } from 'react-router-dom'
import { ButtonDeleted } from '../../../components/atoms'

const UserListItem = ({ user, users, setUsers }) => {
	const navigate = useNavigate()

	return (
		<tbody>
			<tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
				<td
					onClick={() =>
						navigate(`/app/user/specs`, {
							state: { user }
						})
					}
					className="hover:text-blue-600 hover:underline cursor-pointer"
				>
					{user.name || 'Has no name'}
				</td>
				<td>{user.email}</td>
				<td>{user.role}</td>
				<td className="cursor-pointer">
					<ButtonDeleted
						endpoint={'users'}
						ID={user._id}
						setter={setUsers}
						items={users}
					/>
				</td>
			</tr>
		</tbody>
	)
}

export default UserListItem
