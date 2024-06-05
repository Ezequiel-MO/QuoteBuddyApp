import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { filterStyles } from '../../../constants'
import { ILocation } from '@interfaces/index'
import { useApiFetch } from 'src/hooks/fetchData'
import { Icon } from '@iconify/react'

interface CityFilterProps {
	city: string
	setCity: (city: string) => void
}

export const CityFilter: FC<CityFilterProps> = ({ setCity, city }) => {
	const { data: locations } = useApiFetch<ILocation[]>('locations')
	const [searchTerm, setSearchTerm] = useState('')
	const [isDropdownVisible, setIsDropdownVisible] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const filteredLocations = searchTerm
		? locations.filter((location) =>
				location.name.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: locations

	const handleCityChange = (cityName: string) => {
		setCity(cityName)
		setIsDropdownVisible(false)
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && filteredLocations.length > 0) {
			handleCityChange(filteredLocations[0].name)
			e.preventDefault()
		}
	}

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setIsDropdownVisible(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [dropdownRef])

	return (
		<div className="relative" ref={dropdownRef}>
			<div
				className="min-w-[150px] cursor-pointer border border-gray-300 rounded-md p-2 flex items-center justify-between"
				onClick={() => setIsDropdownVisible(!isDropdownVisible)}
			>
				<span>{city || 'Select a city'}</span>
				{isDropdownVisible ? (
					<Icon icon="raphael:arrowup" />
				) : (
					<Icon icon="raphael:arrowdown" />
				)}
			</div>

			{isDropdownVisible && (
				<div className="min-w-[200px] absolute mt-1 w-full rounded-md bg-gray-600 shadow-lg z-50">
					<div className="p-2 border-b border-gray-300">
						Find Active City
						<input
							type="text"
							className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black-50"
							placeholder="Search city..."
							onChange={(e) => setSearchTerm(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
					</div>
					<div className="max-h-60 overflow-y-auto">
						{filteredLocations.map((location: ILocation) => (
							<div
								key={location.name}
								className="p-2 hover:bg-gray-100 hover:text-black-50 cursor-pointer"
								onClick={() => handleCityChange(location.name)}
							>
								{location.name}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
