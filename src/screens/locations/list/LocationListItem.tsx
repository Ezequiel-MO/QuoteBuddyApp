import { ButtonDeleteWithAuth } from '../../../components/atoms'
import { listStyles } from '@constants/styles/listStyles'
import { ILocation } from '@interfaces/location'
import { useLocation } from '../context/LocationsContext'
import { useNavigate } from 'react-router-dom'

interface LocationListItemProps {
	item: ILocation
	canBeAddedToProject: boolean
}

const LocationListItem = ({
	item: location,
	canBeAddedToProject = false
}: LocationListItemProps) => {
	const { state, dispatch } = useLocation()
	const navigate = useNavigate()

	const handleNavigateToLocationSpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		dispatch({
			type: 'SET_LOCATION',
			payload: location
		})
		navigate('/app/location/specs')
	}
	return (
		<tr className={listStyles.tr}>
			<td
				onClick={handleNavigateToLocationSpecs}
				className="hover:text-blue-600 hover:underline cursor-pointer"
			>
				{location.name}
			</td>
			<td className={listStyles.td}>{location.country}</td>
			<td className="cursor-pointer">
				<ButtonDeleteWithAuth
					endpoint={'locations'}
					ID={location._id}
					setter={(updatedLocations: ILocation[]) =>
						dispatch({
							type: 'SET_LOCATIONS',
							payload: updatedLocations
						})
					}
					items={state.locations || []}
				/>
			</td>
		</tr>
	)
}

export default LocationListItem
