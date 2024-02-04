import { FC, useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { useFetchCountries } from 'src/hooks/fetchData/useFetchCountries'
import { useApiFetch } from 'src/hooks/fetchData'
import { ICountry } from '@interfaces/country'

interface CountryFilterProps {
	setCountry: (value: string) => void
	country: string
}

export const CountryFilter: FC<CountryFilterProps> = ({ setCountry, country }) => {
	const { countries } = useFetchCountries()

	const options = countries as ICountry[]

	const [searchTerm, setSearchTerm] = useState('')
	const [isDropdownVisible, setIsDropdownVisible] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const filteredCountries = searchTerm ? options.filter(el =>
		el.name.toLowerCase().includes(searchTerm.toLowerCase())
	) : options

	const { data } = useApiFetch(`countries?accessCode=${country}`)
	const countryByAccessCode = data.length > 0 ? data[0] as ICountry : null

	const handleCountryChange = (countryAccessCode: string) => {
		setCountry(countryAccessCode)
		setIsDropdownVisible(false)
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && filteredCountries.length > 0) {
			handleCountryChange(filteredCountries[0].accessCode as string)
			e.preventDefault()
		}
	}


	//"useEffect" que sirve cuando click fuera del div que se cierre
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
		setSearchTerm("")
	}, [isDropdownVisible])


	return (
		<div className='relative' ref={dropdownRef}>
			<div className='min-w-[150px] cursor-pointer border border-gray-300 rounded-md p-2 flex items-center justify-between'
				onClick={() => setIsDropdownVisible(!isDropdownVisible)}
			>
				<span>
					{
						countryByAccessCode &&
							Object.values(countryByAccessCode).length > 0 ?
							countryByAccessCode.name
							:
							'Select a country'
					}
				</span>
				{
					isDropdownVisible ?
						<Icon icon="raphael:arrowup" />
						:
						<Icon icon="raphael:arrowdown" />
				}
			</div>
			{
				isDropdownVisible &&
				<div className="min-w-[200px] absolute mt-1 w-full rounded-md bg-gray-600 shadow-lg z-50">
					<div className="p-2 border-b border-gray-300">
						Find Active Country
						<input
							type="text"
							className="mt-1 w-full p-2 border border-gray-300 rounded-md text-black-50"
							placeholder="Search city..."
							onChange={(e) => setSearchTerm(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
					</div>
					<div className="max-h-60 overflow-y-auto">
						{
							filteredCountries.map((country, index) => {
								return (
									<div
										key={country.name}
										className='p-2 hover:bg-gray-100 hover:text-black-50 cursor-pointer'
										onClick={() => handleCountryChange(country?.accessCode as string)}
									>
										{country.name}
									</div>
								)
							})
						}
						{
							country &&
							// !searchTerm &&
							<div
								className='p-2 hover:bg-gray-100 hover:text-black-50 cursor-pointer'
								onClick={() => handleCountryChange("")}
							>
								ALL
							</div>
						}
					</div>
				</div>
			}
		</div>
	)
}
