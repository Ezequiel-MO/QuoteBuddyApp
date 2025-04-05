import React, { useState, useEffect, ChangeEvent, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableHeaders } from '../../../ui'
import UserListItem from './UserListItem'
import { Spinner } from '../../../components/atoms'
import { useApiFetch } from 'src/hooks/fetchData/useApiFetch'
import { IUser } from '@interfaces/user'
import { ListHeader } from '@components/molecules'
import { Button } from 'src/components/atoms'
import { useAuth } from 'src/context/auth/AuthProvider'
import { UserListRestoreItem } from './restore/UserListRestoreItem'

const classButton = 'flex items-center uppercase  px-3 py-1 text-sm  text-white-0 bg-green-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95'

const UserList: React.FC = () => {

	const { auth } = useAuth()

	const navigate = useNavigate()

	const [user] = useState<IUser>({} as IUser)

	const [searchItem, setSearchItem] = useState<string>('')

	const [filterIsDeleted, setFilterIsDeleted] = useState(false)

	const {
		isLoading,
		data: users,
		setData: setUsers
	} = useApiFetch<IUser[]>(
		!filterIsDeleted ? 'users' : 'users/isDeleted/true',
		0,
		true,
		0
	)

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
				title={!filterIsDeleted ? 'Users' : 'Users Restore'}
				titleCreate='User'
				handleClick={() => {
					setFilterIsDeleted(false)
					navigateToUserSpecs(user)
				}}
				searchItem={searchItem}
				filterList={filterList}
			/>

			{auth.role === 'admin' && (
				<div className="flex justify-end  mb-3 mr-2">
					<Button
						icon="hugeicons:data-recovery"
						widthIcon={20}
						newClass={classButton}
						type="button"
						handleClick={() => setFilterIsDeleted((prev) => !prev)}
					>
						{!filterIsDeleted ? `activate restore` : 'exit restore'}
					</Button>
				</div>
			)}
			<hr />

			<div className="flex-1 m-4 flex-col">
				{isLoading ? (
					<Spinner />
				) : (
					(foundUsers?.length > 0 && (
						<table className="w-full p-5">
							<TableHeaders headers={!filterIsDeleted ? 'user' : 'userRestore'} />
							{
								foundUsers?.map((element) => {
									if (!filterIsDeleted) {
										return (
											<UserListItem
												key={element._id}
												user={element}
												users={foundUsers}
												setUsers={setFoundUsers}
												handleNavigate={navigateToUserSpecs}
											/>
										)
									} else {
										return (
											<UserListRestoreItem
												key={element._id}
												user={element}
												users={foundUsers}
												setUsers={setFoundUsers}
											/>
										)
									}
								})
							}
						</table>
					)) || <h1>This user was not found</h1>
				)}
			</div>
		</>
	)
}

export default UserList
