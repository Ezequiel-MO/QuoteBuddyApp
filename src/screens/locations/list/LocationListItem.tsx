import { useNavigate } from 'react-router-dom'
import { ButtonDeleteWithAuth } from '../../../components/atoms'
import { listStyles } from 'src/constants/listStyles'
import { ILocation } from '@interfaces/location'

interface Props {
	location: ILocation
	locations: ILocation[]
	setLocations: React.Dispatch<React.SetStateAction<ILocation[]>>
}

const LocationListItem = ({ location, locations, setLocations }: Props) => {
	const navigate = useNavigate()

	return (
		<tbody className={listStyles.tbody}>
			<tr className={listStyles.tr}>
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
				<td className={listStyles.td}>{location.country}</td>
				<td className="cursor-pointer">
					<ButtonDeleteWithAuth
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
