import { useState } from 'react'
import { HotelModal } from './hotelModal/HotelModal'
import { useCurrentProject } from '../../../../hooks'
import styles from '../DayEvents.module.css'
import { CardAdd, DraggingCard } from '../../../../components/atoms'

export const HotelList = ({ hotels, onDelete }) => {
	const [open, setOpen] = useState(false)
	const [hotelModal, setHotelModal] = useState()
	const [hotelIndexModal, setIndexHotelModal] = useState()

	const { dragAndDropHotel } = useCurrentProject()

	const handleDragStart = (e, index) => {
		e.dataTransfer.setData('hotelIndex', index)
	}

	const handleDrop = (e, index) => {
		e.preventDefault()
		const startHotelIndex = e.dataTransfer.getData('hotelIndex')
		dragAndDropHotel({
			startHotelIndex: Number(startHotelIndex),
			endHotelIndex: index
		})
	}

	const handleClick = (e, hotel, index) => {
		setHotelModal(hotel)
		setIndexHotelModal(index)
		setOpen(true)
	}

	if (hotels.length === 0) {
		return (
			<div className={styles.hotels}>
				<CardAdd name="hotel" />
			</div>
		)
	}

	return (
		<div className={styles.hotels}>
			<HotelModal
				open={open}
				setOpen={setOpen}
				hotel={hotelModal}
				index={hotelIndexModal}
			/>

			{hotels.map((hotel, index) => (
				<div key={hotel._id}>
					<DraggingCard
						item={hotel}
						index={index}
						handleDragStart={handleDragStart}
						handleDrop={handleDrop}
						handleDragEnd={null}
						handleClick={handleClick}
						onDelete={onDelete}
					/>
					{index === hotels.length - 1 && (
						<CardAdd name="hotel" timeOfEvent={null} dayOfEvent={null} />
					)}
				</div>
			))}
		</div>
	)
}
