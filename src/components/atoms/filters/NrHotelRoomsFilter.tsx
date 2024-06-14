import { useHotel } from '@screens/hotels/context/HotelsContext'
import { filterStyles } from '../../../constants'

export const NrHotelRoomsFilter = () => {
	const { state, handleChange } = useHotel()
	return (
		<div className={filterStyles['selectContainer']}>
			<select
				id="numberRooms"
				name="numberRooms"
				value={state.currentHotel?.numberRooms}
				className={filterStyles['select']}
				onChange={handleChange}
			>
				<option value={0}>--- Filter by Nr.Rooms(All) ---</option>
				<option value={50}>--- up to 50 ---</option>
				<option value={100}>--- up to 100 ---</option>
				<option value={200}>--- up to 200 ---</option>
				<option value={600}>--- up to 600 ---</option>
			</select>
		</div>
	)
}
