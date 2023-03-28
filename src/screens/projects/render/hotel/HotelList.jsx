import { Icon } from '@iconify/react'
import styles from '../DayEvents.module.css'

export const HotelList = ({ hotels, onDelete }) => {
	if (hotels.length === 0) return null
	return (
		<div className={styles.hotels}>
			{hotels.map((hotel) => (
				<div key={hotel._id} className={styles.hotel}>
					<p className="text-white-50">{hotel.name}</p>
					<span className={styles.deleted} onClick={() => onDelete(hotel._id)}>
						<Icon icon="lucide:delete" color="#ea5933" />
					</span>
				</div>
			))}
		</div>
	)
}
