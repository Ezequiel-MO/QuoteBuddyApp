import { useState } from 'react'
import { CardAdd, IntroAdd } from '../../../../../components/atoms'
import { EventModal } from './eventModal/EventModal'
import { useItems } from '../../useItems'
import { IntroModal } from './introModal/IntroModal'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { EventCard } from './card/EventCard'
import { IDay, IEvent } from '@interfaces/index'

interface DayEventsProps {
	day: IDay
	event: string
	handleDeleteEvent: (
		dayIndex: number,
		timeOfEvent: string,
		eventId: string
	) => void
	dayIndex: number
	renderAddCard?: boolean
}

export const DayEvents: React.FC<DayEventsProps> = ({
	day,
	event,
	handleDeleteEvent,
	dayIndex,
	renderAddCard = true
}) => {
	const events: IEvent[] | undefined = !Object.keys(day[event]).includes(
		'events'
	)
		? (day[event] as IEvent[])
		: day[event]?.events

	const hasEvents = events && events.length > 0
	const { itemsState } = useItems(events || [])
	const [open, setOpen] = useState(false)
	const [eventModal, setEventModal] = useState<IEvent | undefined>(undefined)
	const [, setIndexEventModal] = useState<number | undefined>(undefined)
	const [openModalIntro, setOpenModalIntro] = useState(false)

	const namesEvents = ['morningEvents', 'afternoonEvents']

	const { setNodeRef } = useDroppable({
		id: event + '-' + dayIndex
	})

	if (!namesEvents.includes(event)) {
		return null
	}

	const handleClick = (
		e: React.MouseEvent<HTMLElement>,
		eventModal: IEvent,
		index: number
	) => {
		e.preventDefault()
		setEventModal(eventModal)
		setIndexEventModal(index)
		setOpen(true)
	}

	return (
		<div className="grid gap-2 w-full hover:bg-gray-700 p-2" ref={setNodeRef}>
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

				{/* Always render CardAdd */}
				{renderAddCard && (
					<CardAdd
						name="activity"
						route="activity"
						timeOfEvent={event}
						dayOfEvent={dayIndex}
					/>
				)}

				{/* Always render IntroAdd */}
				<IntroAdd setOpen={setOpenModalIntro} events={day[event]} />
				<IntroModal
					day={day.date}
					open={openModalIntro}
					setOpen={setOpenModalIntro}
					eventType={event}
					dayIndex={dayIndex}
					events={day[event]}
				/>

				{/* Render Event Cards if there are events */}
				{hasEvents &&
					events?.map((el: IEvent, index) => (
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
