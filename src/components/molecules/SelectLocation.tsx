import React, { ChangeEvent, useEffect, useState } from 'react'
import { ILocation } from '@interfaces/location'
import { useApiFetch } from 'src/hooks/fetchData'

interface Props {
	handleChange: (event: ChangeEvent<HTMLSelectElement>) => void
	city: string
	setData: React.Dispatch<React.SetStateAction<any>>
	name?: string
}

export const SelectLocation: React.FC<Props> = ({
	handleChange,
	city,
	setData,
	name
}) => {
	const { data: locationsData } = useApiFetch('locations')

	const locations = locationsData as ILocation[]
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
		if (search) {
			setData((prevData: any) => ({
				...prevData,
				[name ?? 'city']:
					filteredOptions.length > 0 ? filteredOptions[0].name : ''
			}))
		}
		if (!search && !city) {
			setData((prevData: any) => ({
				...prevData,
				[name ?? 'city']: ''
			}))
		}
	}, [search])

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
				name={name ?? 'city'}
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
