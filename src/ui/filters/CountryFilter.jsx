import { useGetCountries } from '../../hooks'

export const CountryFilter = ({ setCountry, country, name }) => {
	const { countries: options } = useGetCountries()
	return (
		<div className="w-full my-2">
			<div className="flex items-center gap-2">
				<select
					id="country"
					className="w-full px-3 py-2 text-base text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
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
		</div>
	)
}
