import { FC, useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { useFetchCountries } from 'src/hooks/fetchData/useFetchCountries'
import { ICountry } from '@interfaces/country'

interface CountryFilterProps {
	setCountry: (value: string) => void
	country: string
}

export const CountryFilter: FC<CountryFilterProps> = ({
	setCountry,
	country
}) => {
	const { countries } = useFetchCountries()
	const options = countries as ICountry[]

	const [searchTerm, setSearchTerm] = useState('')
	const [isDropdownVisible, setIsDropdownVisible] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const filteredCountries = searchTerm
		? options.filter((el) =>
				el.name.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: options

	const handleCountryChange = (countryAccessCode: string) => {
		setCountry(countryAccessCode)
		setIsDropdownVisible(false)
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && filteredCountries.length > 0) {
			handleCountryChange(filteredCountries[0].accessCode || '')
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

	useEffect(() => {
		setSearchTerm('')
	}, [isDropdownVisible])

	return (
		<div className="relative" ref={dropdownRef}>
			<div
				className="min-w-[150px] cursor-pointer border border-gray-300 rounded-md p-2 flex items-center justify-between"
				onClick={() => setIsDropdownVisible(!isDropdownVisible)}
			>
				<span>
					{country
						? options.find((opt) => opt.accessCode === country)?.name ||
						  'Select a country'
						: 'All countries'}
				</span>
				{isDropdownVisible ? (
					<Icon icon="raphael:arrowup" />
				) : (
					<Icon icon="raphael:arrowdown" />
				)}
			</div>
			{isDropdownVisible && (
				<div className="min-w-[200px] absolute mt-1 w-full rounded-md bg-gray-600 shadow-lg z-50">
					<div className="p-2 border-b border-gray-300">
						Find Active Country
						<input
							type="text"
							className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black-50"
							placeholder="Search country..."
							onChange={(e) => setSearchTerm(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
					</div>
					<div className="max-h-60 overflow-y-auto">
						<div
							className="p-2 hover:bg-gray-100 hover:text-black-50 cursor-pointer"
							onClick={() => handleCountryChange('')}
						>
							All countries
						</div>
						{filteredCountries.map((country) => (
							<div
								key={country.accessCode}
								className="p-2 hover:bg-gray-100 hover:text-black-50 cursor-pointer"
								onClick={() =>
									handleCountryChange(country.accessCode as string)
								}
							>
								{country.name}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
