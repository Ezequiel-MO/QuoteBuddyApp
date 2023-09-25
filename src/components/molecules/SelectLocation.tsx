import React, { ChangeEvent, useState } from 'react'
import { ILocation } from '@interfaces/location'
import { useGetLocations } from 'src/hooks'

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
				className="w-2/5
				px-2
				py-1
				text-base
				border 
				border-solid 
				bg-gray-700
				rounded
				focus:text-white-0 "
				type="text"
				placeholder="search..."
				value={search}
				onChange={handleSearch}
			/>

			<select
				name="city"
				id="city"
				value={city}
				className="flex-1
				w-3/6
				py-1 
				px-2 
				border-0 
				rounded-md 
				bg-gray-700 
				text-center 
				cursor-pointer ml-2"
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
