import { useState } from 'react'
import { useCurrentProject, useDragAndDrop } from '../../../../hooks'
import { HotelModal } from './hotelModal/HotelModal'
import {
	DndContext,
	closestCenter,
	useSensor,
	useSensors,
	MouseSensor,
	TouchSensor
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { HotelCard } from './HotelCard'
import { CardAdd } from '../../../../components/atoms'
import styles from '../DayEvents.module.css'
import { useHotels } from './useHotels'

export const HotelList = ({ hotels, onDelete }) => {
	const { dragAndDropHotel } = useCurrentProject()

	const [open, setOpen] = useState(false)
	const [hotelsState] = useHotels(hotels)
	const [hotelModal, setHotelModal] = useState()
	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

	const { items, handleDragEnd } = useDragAndDrop(hotelsState, dragAndDropHotel)

	const handleClick = (e, hotel) => {
		setHotelModal(hotel)
		setOpen(true)
	}

	return (
		<div className={styles.hotels}>
			<HotelModal open={open} setOpen={setOpen} hotel={hotelModal} />

			<DndContext
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				sensors={sensors}
			>
				<SortableContext
					items={hotelsState}
					strategy={verticalListSortingStrategy}
				>
					{items.map((hotel, index) => (
						<HotelCard
							key={hotel._id}
							hotel={hotel}
							onDelete={onDelete}
							handleClick={handleClick}
							index={index}
						/>
					))}
				</SortableContext>
			</DndContext>
			<CardAdd
				route="hotel"
				name="hotel"
				timeOfEvent={null}
				dayOfEvent={null}
			/>
		</div>
	)
}
