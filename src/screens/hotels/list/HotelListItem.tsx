import { useNavigate, useLocation } from 'react-router-dom'
import {
	AddToProjectButton,
	ButtonDeleteWithAuth
} from '../../../components/atoms'
import { IHotel } from 'src/interfaces'
import { listStyles } from 'src/constants/listStyles'

interface HotelListItemProps {
	hotel: IHotel
	canBeAddedToProject: boolean
	hotels: IHotel[]
	setHotels: React.Dispatch<React.SetStateAction<IHotel[]>>
}

export const HotelListItem = ({
	hotel,
	canBeAddedToProject = false,
	hotels,
	setHotels
}: HotelListItemProps) => {
	const navigate = useNavigate()
	const location = useLocation()

	const addHotelToProject = () => {
		navigate(`/app/hotel/${hotel._id}`, {
			state: { hotelName: hotel.name, dayOfEvent: location?.state.dayOfEvent }
		})
	}

	return (
		<tbody className={listStyles.tbody}>
			<tr className={listStyles.tr}>
				<td
					onClick={() =>
						navigate(`/app/hotel/specs`, {
							state: { hotel }
						})
					}
					className={`${listStyles.td} hover:text-blue-600 hover:underline cursor-pointer`}
				>
					{hotel.name}
				</td>
				<td className={listStyles.td}>{`${hotel.numberStars} stars`}</td>
				<td className={`max-w-40 truncate ${listStyles.td}`}>
					{' '}
					{hotel.address}
				</td>
				<td className={listStyles.td}>{`${hotel.numberRooms} rooms`}</td>
				<td className={listStyles.td}>{`${
					hotel.meetingRooms ?? ''
				} meeting rooms`}</td>
				<td className={listStyles.td}>{`${hotel.city ?? ''} `}</td>
				<td className={`${listStyles.td} cursor-pointer`}>
					<ButtonDeleteWithAuth
						endpoint={'hotels'}
						ID={hotel._id}
						setter={setHotels}
						items={hotels}
					/>
				</td>
				{canBeAddedToProject && (
					<AddToProjectButton
						canBeAddedToProject={canBeAddedToProject}
						onAdd={addHotelToProject}
					/>
				)}
			</tr>
		</tbody>
	)
}
