import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableHeaders } from '../../../ui'
import { useGetUsers } from '../../../hooks'
import UserListItem from './UserListItem'
import { Spinner } from '../../../components/atoms'
import { SearchInput } from '../../../components/molecules/inputs/SearchInput'

const UserList = () => {
	const navigate = useNavigate()
	const [user] = useState({})
	const [searchItem, setSearchItem] = useState('')
	const { isLoading, users, setUsers } = useGetUsers()
	const [foundUsers, setFoundUsers] = useState([])

	useEffect(() => {
		setFoundUsers(users)
	}, [users])

	const filterList = (event) => {
		setSearchItem(event.target.value)
		const result = users.filter(
			(data) =>
				data.email.toLowerCase().includes(event.target.value.toLowerCase()) ||
				(data.name &&
					data?.name.toLowerCase().includes(event.target.value.toLowerCase()))
		)
		setFoundUsers(result)
		if (searchItem === '') {
			setFoundUsers(users)
		}
	}

	const userList = foundUsers?.map((element) => (
		<UserListItem
			key={element._id}
			user={element}
			users={users}
			setUsers={setUsers}
		/>
	))

	return (
		<>
			<div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
				<div className="flex flex-col w-full">
					<h1 className="text-2xl">Users List</h1>
					<div className="flex flex-row justify-start">
						<button
							onClick={() => navigate('/app/user/specs', { state: { user } })}
							className="mr-5 focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
						>
							Create New User
						</button>
						<SearchInput searchItem={searchItem} filterList={filterList} />
					</div>
				</div>
			</div>
			<hr />

			<div className="flex-1 m-4 flex-col">
				{isLoading ? (
					<Spinner />
				) : (
					(userList.length > 0 && (
						<table className="w-full p-5">
							<TableHeaders headers="user" />
							{userList}
						</table>
					)) || <h1>This user was not found</h1>
				)}
			</div>
		</>
	)
}

export default UserList
