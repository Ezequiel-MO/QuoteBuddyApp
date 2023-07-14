import { useNavigate } from 'react-router-dom'
import { ButtonDeleted } from '../../../components/atoms'

const LocationListItem = ({ location, locations, setLocations }) => {
	const navigate = useNavigate()

	return (
		<tbody>
			<tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
				<td
					onClick={() =>
						navigate(`/app/location/specs`, {
							state: { location }
						})
					}
					className="hover:text-blue-600 hover:underline cursor-pointer"
				>
					{location.name}
				</td>
				<td>{location.country}</td>
				<td className="cursor-pointer">
					<ButtonDeleted
						endpoint={'locations'}
						ID={location._id}
						setter={setLocations}
						items={locations}
					/>
				</td>
			</tr>
		</tbody>
	)
}

export default LocationListItem
