import { ChangeEvent, useEffect, useState, FC } from 'react'
import { IAccManager } from '@interfaces/accManager'
import { useFetchAccManagers } from 'src/hooks/fetchData/useFetchAccManagers'

interface ProjectAccManagersSelectorProps {
	accManagerValue: string
	handleChange: (name: string, value: string | string[]) => void
}

export const ProjectAccManagersSelector: FC<
	ProjectAccManagersSelectorProps
> = ({ accManagerValue, handleChange }) => {
	const { accManagers } = useFetchAccManagers({ limit: 100 })
	const [search, setSearch] = useState<string>('')

	const filteredManagers = accManagers
		.filter((el) => el.email.toLowerCase().includes(search.toLowerCase()))
		.sort((a, b) => {
			if (a.email < b.email) return -1
			if (a.email > b.email) return 1
			return 0
		})

	// Auto-select the "AccManager" if only one match is found
	useEffect(() => {
		if (search && filteredManagers.length > 0) {
			handleChange('accountManager', [filteredManagers[0]._id])
		} else if (!search && !accManagerValue) {
			handleChange('accountManager', [])
		}
	}, [search, filteredManagers.length])

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const selectedManagerId = event.target.value
		const selectedManager = accManagers.find(
			(manager) => manager._id === selectedManagerId
		)
		if (selectedManager) {
			setSearch(selectedManager.email)
			handleChange('accountManager', [selectedManager._id])
		}
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
					<option value="">No Account Manager found</option>
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
