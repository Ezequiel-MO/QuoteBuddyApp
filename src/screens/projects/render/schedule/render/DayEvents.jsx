import { useState } from 'react'
import { CardAdd } from '../../../../../components/atoms'
import { EventModal } from './eventModal/EventModal'
import { useItems } from '../../useItems'
import styles from '../../DayEvents.module.css'
//dnd kit
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { EventCard } from './card/EventCard'

export const DayEvents = ({
	day,
	event,
	handleDeleteEvent,
	dayIndex,
	renderAddCard = true
}) => {
	const events = !Object.keys(day[event]).includes('events')
		? day[event]
		: day[event]?.events
	const { itemsState } = useItems(events)
	const [open, setOpen] = useState(false)
	const [eventModal, setEventModal] = useState()
	const [eventIndexModal, setIndexEventModal] = useState()

	const namesEvents = [
		'morningEvents',
		'morningMeetings',
		'afternoonEvents',
		'afternoonMeetings',
		'fullDayMeetings'
	]

	const { setNodeRef } = useDroppable({
		id: event + '-' + dayIndex
	})

	if (!namesEvents.includes(event)) {
		return null
	}

	const handleClick = (e, eventModal, index) => {
		setEventModal(eventModal)
		setIndexEventModal(index)
		setOpen(true)
	}

	return (
		<SortableContext
			id={event + '-' + dayIndex}
			items={itemsState}
			strategy={verticalListSortingStrategy}
		>
			<div
				className={
					['morningMeetings', 'afternoonMeetings', 'fullDayMeetings'].includes(
						event
					) && day[event].length === 0
						? styles.emptyDayEventsContainer
						: styles.dayEventsContainer
				}
				ref={setNodeRef}
			>
				<EventModal
					open={open}
					setOpen={setOpen}
					event={eventModal}
					index={eventIndexModal}
					dayIndex={dayIndex}
					typeOfEvent={event}
				/>
				{events?.map((el, index) => {
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
					name="activity"
					route="event"
					timeOfEvent={event}
					dayOfEvent={dayIndex}
				/>
			</div>
		</SortableContext>
	)
}
