import { ChangeEvent, FC } from 'react'
import { useGetLocations } from '../../../hooks'
import { ILocation } from '../../../interfaces/location'

interface CityFilterProps {
	setCity: (city: string) => void
	city: string
}

export const CityFilter: FC<CityFilterProps> = ({ setCity, city }) => {
	const { locations } = useGetLocations()

	const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCity(e.target.value)
	}

	return (
		<div className="w-60 max-w-sm my-2 ml-0 mr-0">
			<div className="flex items-center gap-2">
				<select
					id="city"
					className="flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
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
