import { ICountry } from '@interfaces/country'
import { FC, ChangeEvent } from 'react'
import { filterStyles } from 'src/constants'
import { useFetchCountries } from 'src/hooks/fetchData/useFetchCountries'

interface CountryFilterProps {
	setCountry: (value: string) => void
	country: string
	name?: string
}

export const CountryFilter: FC<CountryFilterProps> = ({
	setCountry,
	country,
	name
}) => {
	const { countries } = useFetchCountries()

	const options = countries as ICountry[]
	return (
		<div className={filterStyles['selectContainer']}>
			<select
				id="country"
				className={filterStyles['select']}
				value={country}
				onChange={(e: ChangeEvent<HTMLSelectElement>) =>
					setCountry(e.target.value)
				}
			>
				<option value="none">
					{name ? name : '--- Filter by country ---'}
				</option>
				{options?.map((option) => (
					<option key={option._id} value={option.accessCode}>
						{option.name}
					</option>
				))}
			</select>
		</div>
	)
}
