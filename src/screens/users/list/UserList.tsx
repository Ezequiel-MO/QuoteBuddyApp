import React, { useState, useEffect, ChangeEvent, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableHeaders } from '../../../ui'
import UserListItem from './UserListItem'
import { Spinner } from '../../../components/atoms'
import { useApiFetch } from 'src/hooks/fetchData/useApiFetch'
import { IUser } from '@interfaces/user'
import { ListHeader } from '@components/molecules'

const UserList: React.FC = () => {
	const navigate = useNavigate()
	const [user] = useState<IUser>({} as IUser)
	const [searchItem, setSearchItem] = useState<string>('')
	const {
		isLoading,
		data: users,
		setData: setUsers
	} = useApiFetch<IUser[]>('users')
	const [foundUsers, setFoundUsers] = useState<IUser[]>([])

	useEffect(() => {
		setFoundUsers(users || [])
	}, [users])

	const filterList = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const searchValue = event.target.value
			setSearchItem(searchValue)
			const result =
				users?.filter(
					(data) =>
						data.email.toLowerCase().includes(searchValue.toLowerCase()) ||
						(data.name &&
							data.name.toLowerCase().includes(searchValue.toLowerCase()))
				) || []
			setFoundUsers(result)

			if (searchValue === '') {
				setFoundUsers(users || [])
			}
		},
		[users]
	)

	const navigateToUserSpecs = useCallback(
		(user: IUser) => {
			navigate('/app/user/specs', { state: { user } })
		},
		[navigate]
	)

	return (
		<>
			<ListHeader
				title="User"
				handleClick={() => navigateToUserSpecs(user)}
				searchItem={searchItem}
				filterList={filterList}
			/>
			<hr />

			<div className="flex-1 m-4 flex-col">
				{isLoading ? (
					<Spinner />
				) : (
					(foundUsers?.length > 0 && (
						<table className="w-full p-5">
							<TableHeaders headers="user" />
							{foundUsers?.map((element) => (
								<UserListItem
									key={element._id}
									user={element}
									users={users}
									setUsers={setUsers}
									handleNavigate={navigateToUserSpecs}
								/>
							))}
						</table>
					)) || <h1>This user was not found</h1>
				)}
			</div>
		</>
	)
}

export default UserList
