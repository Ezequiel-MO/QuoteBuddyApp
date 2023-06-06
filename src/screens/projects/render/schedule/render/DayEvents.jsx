import { useState, useEffect } from 'react';
import { useCurrentProject } from '../../../../../hooks'
import { CardAdd, DraggingCard } from '../../../../../components/atoms'
import { EventModal } from "./eventModal/EventModal"
import styles from '../../DayEvents.module.css'

export const DayEvents = ({
	day,
	event,
	handleDeleteEvent,
	dayIndex,
	renderAddCard = true
}) => {
	const { dragAndDropEvent } = useCurrentProject()
	const [open, setOpen] = useState(false)
	const [eventModal, setEventModal] = useState()
	const [eventIndexModal, setIndexEventModal] = useState() // el index puede ser que no sea necesario 

	const type = {
		morningEvents: 'event',
		morningMeetings: 'event',
		lunch: 'restaurant',
		afternoonEvents: 'event',
		afternoonMeetings: 'event',
		dinner: 'restaurant',
		fullDayMeetings: 'event'
	}

	const handleDragStart = (e, el, index, dayIndex, event) => {
		e.dataTransfer.setData('dayEventId', el._id)
		e.dataTransfer.setData('indexDayEvent', index)
		e.dataTransfer.setData('dayStartIndex', dayIndex)
		e.dataTransfer.setData('timeOfEvent', event)
		e.currentTarget.classList.add(styles.dragging)
	}

	const handleDragEnd = (e) => {
		e.currentTarget.classList.remove(styles.dragging)
	}

	const handleDrop = (e, index) => {
		e.preventDefault()
		const startIndexDayEvent = e.dataTransfer.getData('indexDayEvent')
		const dayStartIndex = e.dataTransfer.getData('dayStartIndex')
		const timeOfEventStart = e.dataTransfer.getData('timeOfEvent')
		dragAndDropEvent({
			startIndexDayEvent,
			dayStartIndex: Number(dayStartIndex),
			timeOfEventStart,
			index,
			event,
			dayIndex
		})
	}

	const handleDropEmpty = (e) => {
		if (day[event].length === 0) {
			e.preventDefault()
			const startIndexDayEvent = e.dataTransfer.getData('indexDayEvent')
			const dayStartIndex = e.dataTransfer.getData('dayStartIndex')
			const timeOfEventStart = e.dataTransfer.getData('timeOfEvent')
			dragAndDropEvent({
				startIndexDayEvent,
				dayStartIndex: Number(dayStartIndex),
				timeOfEventStart,
				index: 0,
				event,
				dayIndex
			})
		}
	}

	const handleDragOver = (e) => {
		e.preventDefault()
	}

	const handleClick = (e, eventModal, index) => {
		setEventModal(eventModal)
		setIndexEventModal(index)
		setOpen(true)
	}

	return (
		<div
			className={
				['morningMeetings', 'afternoonMeetings', 'fullDayMeetings'].includes(
					event
				) && day[event].length === 0
					? styles.emptyDayEventsContainer
					: styles.dayEventsContainer
			}
			onDrop={(e) => handleDropEmpty(e)}
			onDragOver={(e) => handleDragOver(e)}
		>
			<EventModal
				open={open}
				setOpen={setOpen} 
				event={eventModal} 
				index={eventIndexModal}
				dayIndex={dayIndex}
				typeOfEvent={event} 
				/>
			<>
				{day[event].map((el, index) => (
					<div key={el._id}>
						<DraggingCard
							item={el}
							index={index}
							handleDragStart={(e) =>
								handleDragStart(e, el, index, dayIndex, event)
							}
							handleDrop={(e) => handleDrop(e, index)}
							handleDragEnd={handleDragEnd}
							handleClick={handleClick}
							onDelete={() => handleDeleteEvent(dayIndex, event, el._id)}
						/>
					</div>
				))}
				{renderAddCard && (
					<CardAdd
						name={type[event]}
						route={type[event]}
						timeOfEvent={event}
						dayOfEvent={dayIndex}
					/>
				)}
			</>
		</div>
	)
}
