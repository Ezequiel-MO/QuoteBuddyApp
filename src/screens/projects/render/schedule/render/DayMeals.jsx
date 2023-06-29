import { useState } from 'react'
import { CardAdd, IntroAdd } from '../../../../../components/atoms'
import { EventModal } from './eventModal/EventModal'
import { IntroModal } from './introModal/IntroModal'
import { useItems } from '../../useItems'
import styles from '../../DayEvents.module.css'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { EventCard } from './card/EventCard'

export const DayMeals = ({
	day,
	event,
	handleDeleteEvent,
	dayIndex,
	renderAddCard = true
}) => {
	const restaurants = !Object.keys(day[event]).includes('restaurants')
		? day[event]
		: day[event]?.restaurants

	const { itemsState } = useItems(restaurants)
	const [open, setOpen] = useState(false)
	const [eventModal, setEventModal] = useState()
	const [, setIndexEventModal] = useState()
	const [openModalIntro, setOpenModalIntro] = useState(false)

	const { setNodeRef } = useDroppable({
		id: `${event}-${dayIndex}`
	})

	if (!['lunch', 'dinner'].includes(event)) {
		return null
	}

	const handleClick = (e, modalEvent, index) => {
		setEventModal(modalEvent)
		setIndexEventModal(index)
		setOpen(true)
	}

	return (
		<SortableContext
			id={event + '-' + dayIndex}
			items={itemsState}
			strategy={verticalListSortingStrategy}
		>
			<div className={styles.dayEventsContainer} ref={setNodeRef}>
				<EventModal
					open={open}
					setOpen={setOpen}
					event={eventModal}
					dayIndex={dayIndex}
					typeOfEvent={event}
				/>
				<>
					<IntroAdd setOpen={setOpenModalIntro} events={restaurants} />
					<IntroModal
						day={day.date}
						open={openModalIntro}
						setOpen={setOpenModalIntro}
						eventType={event}
						dayIndex={dayIndex}
						events={restaurants}
					/>
					{restaurants?.map((el, index) => {
						return (
							<EventCard
								key={el._id}
								event={el}
								handleClick={handleClick}
								onDelete={() => handleDeleteEvent(dayIndex, event, el._id)}
								index={index}
							/>
						)
					})}
					<CardAdd
						renderAddCard={renderAddCard}
						name="restaurant"
						route="restaurant"
						timeOfEvent={event}
						dayOfEvent={dayIndex}
					/>
				</>
			</div>
		</SortableContext>
	)
}
