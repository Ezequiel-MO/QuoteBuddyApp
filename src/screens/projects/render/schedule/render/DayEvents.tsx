import { useState } from 'react'
import { CardAdd, IntroAdd } from '../../../../../components/atoms'
import { EventModal } from './eventModal/EventModal'
import { useItems } from '../../useItems'
import { IntroModal } from './introModal/IntroModal'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { EventCard } from './card/EventCard'
import { IEvent } from '@interfaces/index'
import { IDay } from '@interfaces/project'
import { TimeOfEvent } from '@redux/features/currentProject/types'

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
	const validEvents = ['morningEvents', 'afternoonEvents']

	if (!validEvents.includes(event)) {
		return null
	}
	const { setNodeRef } = useDroppable({
		id: event + '-' + dayIndex
	})

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
	const [openModalIntro, setOpenModalIntro] = useState<boolean>(false)

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
		<SortableContext
			id={event + '-' + dayIndex}
			items={itemsState}
			strategy={verticalListSortingStrategy}
		>
			<div
				className="bg-gray-800 rounded-lg shadow-md p-3 transition-all duration-300 border border-gray-700 h-full min-h-[200px] hover:border-cyan-800"
				ref={setNodeRef}
			>
				<EventModal
					open={open}
					setOpen={setOpen}
					event={eventModal}
					dayIndex={dayIndex}
					typeOfEvent={event}
				/>

				{/* Header with Add Button */}
				<div className="mb-3">
					{renderAddCard && (
						<CardAdd
							name="activity"
							route="activity"
							timeOfEvent={event}
							dayOfEvent={dayIndex}
						/>
					)}
				</div>

				{/* Intro Section */}
				{hasEvents && (
					<div className="mb-2">
						<IntroAdd setOpen={setOpenModalIntro} events={day[event]} />
						<IntroModal
							day={day.date}
							open={openModalIntro}
							setOpen={setOpenModalIntro}
							eventType={event as TimeOfEvent}
							dayIndex={dayIndex}
							events={day[event]}
						/>
					</div>
				)}

				{/* Events List */}
				<div className="space-y-2 mt-2">
					{hasEvents ? (
						events?.map((el: IEvent, index: number) => (
							<EventCard
								key={el._id}
								event={el}
								handleClick={handleClick}
								onDelete={() => handleDeleteEvent(dayIndex, event, el._id)}
								index={index}
								dayIndex={dayIndex}
								typeEvent={event as 'morningEvents' | 'afternoonEvents'}
							/>
						))
					) : (
						<div className="text-gray-500 text-center py-4 italic">
							No events added
						</div>
					)}
				</div>
			</div>
		</SortableContext>
	)
}
