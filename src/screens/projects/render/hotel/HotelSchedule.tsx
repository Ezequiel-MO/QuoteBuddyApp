import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../helper/toast'
import { useCurrentProject } from '../../../../hooks'
import { HotelList } from './HotelList'
import styles from '../DayEvents.module.css'
import { TableHotel } from './TableHotel'

export const HotelSchedule: React.FC = () => {
	const { removeHotelFromProject, currentProject } = useCurrentProject()

	const mySwal = withReactContent(Swal)

	const handleDeleteHotel = async (hotelId: string) => {
		const result = await mySwal.fire({
			title: 'Do you want to delete the Hotel?',
			html: '<p style="color: red;">The meetings that were created with this Hotel will also be deleted!</p>',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'yes',
			cancelButtonText: `Cancel`,
			customClass: { container: 'custom-container' }
		})
		if (result.isConfirmed) {
			removeHotelFromProject(hotelId)
			toast.success('Hotel Removed', toastOptions)
		}
	}
	return (
		<>
			<h1 className="text-xl font-semibold text-orange-200 mb-2">HOTELS</h1>
			<div className={styles.dayEventsContainer}>
				{currentProject?.multiDestination ? (
					<TableHotel />
				) : (
					<HotelList
						hotels={currentProject['hotels']}
						onDelete={handleDeleteHotel}
					/>
				)}
			</div>
		</>
	)
}
