/* import { useNavigate } from 'react-router-dom' */
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../helper/toast'
import { useCurrentProject } from '../../../../hooks'
import { HotelList } from './HotelList'
import styles from '../DayEvents.module.css'

export const HotelSchedule = () => {
	/* const navigate = useNavigate() */
	const { removeHotelFromProject, currentProject } = useCurrentProject()

	const handleDeleteHotel = (hotelId) => {
		removeHotelFromProject(hotelId)
		toast.success('Hotel Removed', toastOptions)
	}
	return (
		<>
			<h1 className="underline text-orange-200 mb-2">HOTELS</h1>
			<div className={styles.dayEventsContainer}>
				<HotelList
					hotels={currentProject['hotels']}
					onDelete={handleDeleteHotel}
				/>
			</div>
		</>
	)
}
