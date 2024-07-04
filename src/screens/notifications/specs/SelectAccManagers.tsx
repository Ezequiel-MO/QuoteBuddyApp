import React, { ChangeEvent, useEffect, useState } from 'react'
import { useApiFetch } from 'src/hooks/fetchData'
import { IAccManager } from 'src/interfaces/accManager'
import { TextInput } from '@components/atoms'
import { Icon } from '@iconify/react'

interface SelectAccManagersProps {
	state: any // Replace 'any' with the actual type if known
	dispatch: React.Dispatch<any> // Replace 'any' with the actual type if known
}

export const SelectAccManagers: React.FC<SelectAccManagersProps> = ({
	state,
	dispatch
}) => {
	const { data: accManagers } = useApiFetch<IAccManager[]>('accManagers')

	const [search, setSearch] = useState<string>('')
	const [filteredOptions, setFilteredOptions] = useState<IAccManager[]>([])

	useEffect(() => {
		if (accManagers) {
			setFilteredOptions(
				accManagers.filter(
					(manager) =>
						manager.firstName.toLowerCase().includes(search.toLowerCase()) ||
						manager.familyName.toLowerCase().includes(search.toLowerCase()) ||
						manager.email.toLowerCase().includes(search.toLowerCase())
				)
			)
		}
	}, [accManagers, search])

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}

	const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		const selectedManager = accManagers.find((manager) => manager._id === value)
		if (selectedManager) {
			const updatedAccManagers = [
				...(state.currentNotification.accManagers || []),
				selectedManager
			]
			const uniqueAccManagers = Array.from(
				new Set(updatedAccManagers.map((manager) => manager._id))
			).map((id) => updatedAccManagers.find((manager) => manager._id === id)!)
			dispatch({
				type: 'UPDATE_NOTIFICATION_FIELD',
				payload: { name: 'accManagers', value: uniqueAccManagers }
			})
		}
	}

	return (
		<div className="bg-gray-700 text-white border rounded-md px-3 py-2 w-full focus:border-blue-500">
			<TextInput
				type="text"
				label="Search Account Manager"
				placeholder="Search..."
				name="search"
				value={search}
				handleChange={handleSearch}
				handleBlur={() => {}}
				errors=""
			/>
			<select
				name="accManagers"
				id="accManagers"
				className="flex-1 w-3/6 py-1 px-2 border-0 rounded-md bg-gray-700 text-center cursor-pointer ml-2"
				onChange={handleChangeSelect}
			>
				{!search && <option value="">Select Account Manager</option>}
				{filteredOptions.length === 0 && (
					<option value="">No account manager found</option>
				)}
				{filteredOptions.map((manager) => (
					<option
						key={manager._id}
						value={manager._id}
						disabled={(state.currentNotification.accManagers || []).some(
							(acc: IAccManager) => acc._id === manager._id
						)}
					>
						{`${manager.firstName} ${manager.familyName}`}
					</option>
				))}
			</select>
		</div>
	)
}

interface SelectAccManagersBoxProps {
	state: any // Replace 'any' with the actual type if known
	dispatch: React.Dispatch<any> // Replace 'any' with the actual type if known
}

export const SelectAccManagersBox: React.FC<SelectAccManagersBoxProps> = ({
	state,
	dispatch
}) => {
	const handleRemoveManager = (managerId: string) => {
		const updatedAccManagers = (
			state.currentNotification.accManagers || []
		).filter((item: IAccManager) => item._id !== managerId)
		dispatch({
			type: 'UPDATE_NOTIFICATION_FIELD',
			payload: { name: 'accManagers', value: updatedAccManagers }
		})
	}

	return (
		<div className="mt-4 bg-gray-800 p-4 rounded-md">
			<h3 className="text-white text-lg mb-2">Selected Account Managers</h3>
			{(state.currentNotification.accManagers || []).map(
				(manager: IAccManager) => (
					<div
						key={manager._id}
						className="flex items-center justify-between bg-gray-700 p-2 rounded-md mb-2"
					>
						<span className="text-white">{`${manager.firstName} ${manager.familyName}`}</span>
						<button
							onClick={() => handleRemoveManager(manager._id)}
							className="text-red-500"
						>
							<Icon icon="mdi:delete" />
						</button>
					</div>
				)
			)}
		</div>
	)
}
