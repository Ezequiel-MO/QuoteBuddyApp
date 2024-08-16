import { ChangeEvent, useEffect, useState, FC } from 'react'
import { IAccManager } from '@interfaces/accManager'
import { useFetchAccManagers } from 'src/hooks/fetchData/useFetchAccManagers'

interface ProjectAccManagersSelectorProps {
	accManagerValue: string
	handleChange: (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
}

export const ProjectAccManagersSelector: FC<
	ProjectAccManagersSelectorProps
> = ({ accManagerValue, handleChange }) => {
	const { accManagers } = useFetchAccManagers()
	const [search, setSearch] = useState<string>('')
	const [filteredManagers, setFilteredManagers] = useState<IAccManager[]>([])

	useEffect(() => {
		if (search === '') {
			setFilteredManagers([])
		} else {
			const filtered = accManagers.filter((manager) =>
				manager.email.toLowerCase().includes(search.toLowerCase())
			)
			setFilteredManagers(filtered)
		}
	}, [search, accManagers])

	useEffect(() => {
		if (filteredManagers.length === 1) {
			handleChange({
				target: { name: 'accountManager', value: filteredManagers[0]._id }
			} as ChangeEvent<HTMLSelectElement>)
		} else if (!search && !accManagerValue) {
			handleChange({
				target: { name: 'accountManager', value: '' }
			} as ChangeEvent<HTMLSelectElement>)
		}
	}, [search, filteredManagers.length])

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const selectedManager = accManagers.find(
			(manager) => manager._id === event.target.value
		)
		if (selectedManager) {
			setSearch(selectedManager.email)
		}
		handleChange(event)
	}

	return (
		<div className="bg-gray-700 text-white border rounded-md px-3 py-2 w-full focus:border-blue-500">
			<input
				className="w-2/5 px-2 py-1 text-base border border-solid bg-gray-700 rounded focus:text-white"
				type="text"
				placeholder="Search for an account manager..."
				value={search}
				onChange={handleSearch}
			/>
			<select
				name="accountManager"
				value={accManagerValue}
				className="flex-1 w-3/6 py-1 px-2 border-0 rounded-md bg-gray-700 text-center cursor-pointer ml-2"
				onChange={handleSelectChange}
			>
				{!search && <option value="">Select an account manager</option>}
				{filteredManagers.length === 0 && (
					<option value="">No manager found</option>
				)}
				{filteredManagers.map((manager) => (
					<option key={manager._id} value={manager._id}>
						{manager.email}
					</option>
				))}
			</select>
		</div>
	)
}
