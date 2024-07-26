import { useState } from 'react'
import { CardAdd, IntroAdd } from '../../../../../components/atoms'
import { EventModal } from './eventModal/EventModal'
import { useItems } from '../../useItems'
import { IntroModal } from './introModal/IntroModal'
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

	const hasEvents = events && events.length > 0
	const { itemsState } = useItems(events)
	const [open, setOpen] = useState(false)
	const [eventModal, setEventModal] = useState()
	const [, setIndexEventModal] = useState()
	const [openModalIntro, setOpenModalIntro] = useState(false)

	const namesEvents = [
		'morningEvents',
		// 'morningMeetings',
		'afternoonEvents'
		// 'afternoonMeetings',
		// 'fullDayMeetings'
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
		<div className="flex flex-col w-full hover:bg-gray-700" ref={setNodeRef}>
			<SortableContext
				id={event + '-' + dayIndex}
				items={itemsState}
				strategy={verticalListSortingStrategy}
			>
				<EventModal
					open={open}
					setOpen={setOpen}
					event={eventModal}
					dayIndex={dayIndex}
					typeOfEvent={event}
				/>
				{renderAddCard && (
					<CardAdd
						name="activity"
						route="activity"
						timeOfEvent={event}
						dayOfEvent={dayIndex}
					/>
				)}
				{hasEvents && (
					<>
						<IntroAdd setOpen={setOpenModalIntro} events={day[event]} />
						<IntroModal
							day={day.date}
							open={openModalIntro}
							setOpen={setOpenModalIntro}
							eventType={event}
							dayIndex={dayIndex}
							events={day[event]}
						/>
					</>
				)}

				{events?.map((el, index) => (
					<EventCard
						key={el._id}
						event={el}
						handleClick={handleClick}
						onDelete={() => handleDeleteEvent(dayIndex, event, el._id)}
						index={index}
						dayIndex={dayIndex}
						typeEvent={event}
					/>
				))}
			</SortableContext>
		</div>
	)
}
