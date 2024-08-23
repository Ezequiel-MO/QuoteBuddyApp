import React, { ChangeEvent, useEffect, useState } from 'react'
import { ILocation } from '@interfaces/location'
import { useApiFetch } from 'src/hooks/fetchData'

interface Props {
	city: string
	handleChange: (
		event: ChangeEvent<HTMLSelectElement | HTMLInputElement>
	) => void
	name?: string
}

export const LocationSelector: React.FC<Props> = ({
	city,
	handleChange,
	name = 'city'
}) => {
	const { data: locations } = useApiFetch<ILocation[]>('locations')

	const [search, setSearch] = useState<string>('')

	const filteredOptions = locations
		.filter((el: ILocation) =>
			el.name.toLowerCase().includes(search.toLowerCase())
		)
		.sort((a: ILocation, b: ILocation) => {
			if (a.name < b.name) return -1
			if (a.name > b.name) return 1
			return 0
		})

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}

	useEffect(() => {
		if (filteredOptions.length === 1) {
			handleChange({
				target: { name, value: filteredOptions[0].name }
			} as ChangeEvent<HTMLSelectElement>)
		} else if (!search && !city) {
			handleChange({
				target: { name, value: '' }
			} as ChangeEvent<HTMLSelectElement>)
		}
	}, [search, filteredOptions.length])

	return (
		<div className="bg-gray-700 text-white-0 border rounded-md px-3 py-2 w-full focus:border-blue-500">
			<input
				className="w-2/5 px-2 py-1 text-base border border-solid bg-gray-700 rounded focus:text-white-0"
				type="text"
				placeholder="search..."
				value={search}
				onChange={handleSearch}
			/>
			<select
				name={name}
				id={name}
				value={city}
				className="flex-1 w-3/6 py-1 px-2 border-0 rounded-md bg-gray-700 text-center cursor-pointer ml-2"
				onChange={handleChange}
			>
				{!search && <option value="">Select a city</option>}
				{filteredOptions.length === 0 && (
					<option value="">no city exists</option>
				)}
				{filteredOptions.map((el: ILocation) => (
					<option value={el.name} key={el._id}>
						{el.name}
					</option>
				))}
			</select>
		</div>
	)
}
