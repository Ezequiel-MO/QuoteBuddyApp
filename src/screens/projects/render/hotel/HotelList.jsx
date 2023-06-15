import { useState } from 'react'
import { useCurrentProject } from '../../../../hooks'
import { HotelModal } from './hotelModal/HotelModal'
import {
	DndContext,
	closestCenter,
	useSensor,
	useSensors,
	MouseSensor,
	TouchSensor
} from '@dnd-kit/core'
import {
	SortableContext,
	verticalListSortingStrategy,
	arrayMove
} from '@dnd-kit/sortable'

import { HotelCard } from './HotelCard'
import { CardAdd } from '../../../../components/atoms'
import styles from '../DayEvents.module.css'
import { useHotels } from './useHotels'

export const HotelList = ({ hotels, onDelete }) => {
	const { dragAndDropHotel } = useCurrentProject()

	const [open, setOpen] = useState(false)
	const { hotelsState, setHotels } = useHotels(hotels)
	const [hotelModal, setHotelModal] = useState()
	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

	// const { items, handleDragEnd } = useDragAndDrop(hotelsState, dragAndDropHotel)

	const handleDragEnd = (event) => {
		const { active, over } = event
		const startHotelIndex = hotelsState.findIndex((el) => el.id === active.id)
		const endHotelIndex = hotelsState.findIndex((el) => el.id === over.id)
		setHotels(arrayMove(hotelsState, startHotelIndex, endHotelIndex))
		dragAndDropHotel({
			startHotelIndex: Number(startHotelIndex),
			endHotelIndex: Number(endHotelIndex)
		})
	}

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
					{hotelsState.map((hotel, index) => (
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
