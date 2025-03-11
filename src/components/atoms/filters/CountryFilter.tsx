import { FC, useEffect, useRef, useState, useCallback } from 'react'
import { Icon } from '@iconify/react'
import { useApiFetch } from 'src/hooks/fetchData/useApiFetch'
import { ICountry } from '@interfaces/country'
import { Spinner } from '../spinner/Spinner'

interface CountryFilterProps {
	country: string
	setCountry: (value: string) => void
}

export const CountryFilter: FC<CountryFilterProps> = ({
	country,
	setCountry
}) => {
	const [searchTerm, setSearchTerm] = useState('')
	const [isDropdownVisible, setIsDropdownVisible] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const { data: countries = [], isLoading } = useApiFetch<ICountry[]>(
		'countries?sort=accessCode',
		0,
		true,
		300
	)

	const handleClickOutside = useCallback((e: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(e.target as Node)
		) {
			setIsDropdownVisible(false)
		}
	}, [])

	const filteredCountries = countries.filter((country) =>
		country.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const handleCountrySelect = useCallback(
		(accessCode: string) => {
			setCountry(accessCode)
			setIsDropdownVisible(false)
			setSearchTerm('')
		},
		[setCountry]
	)

	const handleSearchKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === 'Enter' && filteredCountries.length > 0) {
				handleCountrySelect(filteredCountries[0].accessCode || '')
				e.preventDefault()
			}
		},
		[filteredCountries, handleCountrySelect]
	)

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [handleClickOutside])

	if (isLoading) return <Spinner />

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				type="button"
				aria-haspopup="listbox"
				aria-expanded={isDropdownVisible}
				className="min-w-[150px] cursor-pointer border border-gray-300 rounded-md p-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
				onClick={() => setIsDropdownVisible(!isDropdownVisible)}
			>
				<span className="truncate">
					{country
						? countries.find((c) => c.accessCode === country)?.name ||
						  'Invalid selection'
						: 'All countries'}
				</span>
				<Icon
					icon={isDropdownVisible ? 'raphael:arrowup' : 'raphael:arrowdown'}
				/>
			</button>

			{isDropdownVisible && (
				<div className="min-w-[200px] absolute mt-1 w-full rounded-md bg-white-50 text-black-50 shadow-lg z-50 border border-gray-200">
					<div className="p-2 space-y-2">
						<label className="block text-sm font-medium text-gray-700">
							Search countries
							<input
								type="text"
								autoFocus
								className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
								placeholder="Start typing..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								onKeyDown={handleSearchKeyDown}
							/>
						</label>
					</div>

					<div className="max-h-60 overflow-y-auto border-t border-gray-100">
						<ul role="listbox" className="divide-y divide-gray-100">
							<li
								role="option"
								className="p-2 hover:bg-blue-50 cursor-pointer"
								onClick={() => handleCountrySelect('')}
							>
								All countries
							</li>
							{filteredCountries.map((country) => (
								<li
									key={country.accessCode}
									role="option"
									className="p-2 hover:bg-blue-50 cursor-pointer truncate"
									onClick={() => handleCountrySelect(country.accessCode ?? '')}
								>
									{country.name}
								</li>
							))}
						</ul>

						{filteredCountries.length === 0 && (
							<div className="p-2 text-gray-500">
								No matching countries found
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
