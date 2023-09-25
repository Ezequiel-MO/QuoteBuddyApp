import React, { ChangeEvent, useState } from 'react'
import styles from '../FreeLancer.module.css'
import { useGetLocations } from '../../../hooks/'
import { ILocation } from '@interfaces/location'

interface Props {
	handleChange: (event: ChangeEvent<HTMLSelectElement>) => void
	city: string
}

export const SelectLocation: React.FC<Props> = ({ handleChange, city }) => {
	const { locations } = useGetLocations()
	const [search, setSearch] = useState<string>('')

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}

	const filteredOptions = locations.filter((el: ILocation) =>
		el.name.toLowerCase().includes(search.toLowerCase())
	)

	return (
		<div className="bg-gray-700 text-white border rounded-md px-3 py-2 w-full focus:border-blue-500">
			<input
				className={styles.search}
				type="text"
				placeholder="search..."
				value={search}
				onChange={handleSearch}
			/>

			<select
				name="city"
				id="city"
				value={city}
				className={styles.selectLocation}
				onChange={handleChange}
			>
				{!search && <option value="">Select a city</option>}
				{filteredOptions.length === 0 && (
					<option value="">no city exists</option>
				)}
				{filteredOptions.map((el: ILocation) => {
					return (
						<option value={el.name} key={el._id}>
							{el.name}
						</option>
					)
				})}
			</select>
		</div>
	)
}
