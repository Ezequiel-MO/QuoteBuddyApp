import { ChangeEvent, FC } from 'react'
import { filterStyles } from '../../../constants'
import { ILocation } from '@interfaces/index'
import { useApiFetch } from 'src/hooks/fetchData'

interface CityFilterProps {
	city: string
	setCity: (city: string) => void
}

export const CityFilter: FC<CityFilterProps> = ({ setCity, city }) => {
	const { data: locationsData } = useApiFetch('locations')

	const locations = locationsData as ILocation[]

	const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCity(e.target.value)
	}

	return (
		<div className={filterStyles['container']}>
			<div className={filterStyles['innerContainer']}>
				<select
					id="city"
					className={filterStyles['select']}
					value={city}
					onChange={handleCityChange}
				>
					<option value="none">--- Filter by city(All) ---</option>
					{locations.map((location: ILocation) => (
						<option key={location.name} value={location.name}>
							{` --- ${location.name} --- `}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}
