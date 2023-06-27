import { useState } from 'react'
import { useCurrentProject } from '../../../../hooks'
import { HotelModal } from './hotelModal/HotelModal'
import { HotelCard } from './HotelCard'
import { CardAdd } from '../../../../components/atoms'
import styles from '../DayEvents.module.css'
import { DragAndDropContextProvider } from '../context/DragAndDropContextProvider'

export const HotelList = ({ hotels, onDelete }) => {
	const { dragAndDropHotel } = useCurrentProject()
	const [open, setOpen] = useState(false)
	const [hotelModal, setHotelModal] = useState()

	const handleClick = (e, hotel) => {
		setHotelModal(hotel)
		setOpen(true)
	}

	return (
		<div className={styles.hotels}>
			<HotelModal open={open} setOpen={setOpen} hotel={hotelModal} />
			<DragAndDropContextProvider
				initialItems={hotels}
				onMove={dragAndDropHotel}
			>
				{(itemsState) =>
					itemsState.map((hotel, index) => (
						<HotelCard
							key={hotel._id}
							hotel={hotel}
							onDelete={onDelete}
							handleClick={handleClick}
							index={index}
						/>
					))
				}
			</DragAndDropContextProvider>
			<CardAdd
				name="hotel"
				route="hotel"
				timeOfEvent={null}
				dayOfEvent={null}
			/>
		</div>
	)
}
