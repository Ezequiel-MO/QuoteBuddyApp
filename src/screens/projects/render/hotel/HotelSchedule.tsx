import { toast } from 'react-toastify'
import { toastOptions } from '../../../../helper/toast'
import { useCurrentProject } from '../../../../hooks'
import { HotelList } from './HotelList'
import styles from '../DayEvents.module.css'
import { TableHotel } from './overnight/TableHotel'
import { DELETE_HOTEL_ALERT_CONFIG } from 'src/constants/mySwalAlert'
import { useSweetAlert } from 'src/hooks/alerts/useSweetAlert'

export const HotelSchedule: React.FC = () => {
	const { removeHotelFromProject, currentProject } = useCurrentProject()
	const { showAlert } = useSweetAlert()

	const handleDeleteHotel = async (hotelId: string) => {
		const result = await showAlert(DELETE_HOTEL_ALERT_CONFIG)
		if (result.isConfirmed) {
			removeHotelFromProject(hotelId)
			toast.success('Hotel Removed', toastOptions)
		}
		return result.isConfirmed
	}

	return (
		<>
			<h1 className="text-xl font-semibold text-orange-200 mb-2">HOTELS</h1>
			<div>
				{currentProject?.multiDestination ? (
					<div style={{ marginBottom: '15px' }}>
						<TableHotel onDelete={handleDeleteHotel} />
					</div>
				) : (
					<div className={styles.dayEventsContainer}>
						<HotelList
							hotels={currentProject['hotels']}
							onDelete={handleDeleteHotel}
						/>
					</div>
				)}
			</div>
		</>
	)
}
