import { useState } from 'react'
import { useCurrentProject, useDragAndDrop } from '../../../../hooks'
import { HotelModal } from './hotelModal/HotelModal'
import { HotelCard } from './HotelCard'
import { CardAdd } from '../../../../components/atoms'
import styles from '../DayEvents.module.css'

export const HotelList = ({ hotels, onDelete }) => {
	const { dragAndDropHotel } = useCurrentProject()
	const [open, setOpen] = useState(false)
	const [hotelModal, setHotelModal] = useState()

	const { DragAndDropContext, itemsState } = useDragAndDrop(
		hotels,
		dragAndDropHotel
	)

	const handleClick = (e, hotel) => {
		setHotelModal(hotel)
		setOpen(true)
	}

	return (
		<div className={styles.hotels}>
			<HotelModal open={open} setOpen={setOpen} hotel={hotelModal} />
			<DragAndDropContext>
				{itemsState.map((hotel, index) => (
					<HotelCard
						key={hotel._id}
						hotel={hotel}
						onDelete={onDelete}
						handleClick={handleClick}
						index={index}
					/>
				))}
			</DragAndDropContext>
			<CardAdd
				name="hotel"
				route="hotel"
				timeOfEvent={null}
				dayOfEvent={null}
			/>
		</div>
	)
}
