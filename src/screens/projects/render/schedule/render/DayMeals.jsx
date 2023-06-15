import { useState } from 'react'
import { useCurrentProject } from '../../../../../hooks'
import {
	CardAdd,
	DraggingCard,
	IntroAdd
} from '../../../../../components/atoms'
import { EventModal } from './eventModal/EventModal'
import { IntroModal } from './introModal/IntroModal'
import styles from '../../DayEvents.module.css'

export const DayMeals = ({
	day,
	event,
	handleDeleteEvent,
	dayIndex,
	renderAddCard = true
}) => {
	const restaurants = day[event].restaurants
	const { dragAndDropEvent } = useCurrentProject()
	const [open, setOpen] = useState(false)
	const [eventModal, setEventModal] = useState()
	const [eventIndexModal, setIndexEventModal] = useState()
	const [openModalIntro, setOpenModalIntro] = useState(false)

	const handleDragStart = (e, el, index) => {
		e.dataTransfer.setData('eventIndex', index)
		e.dataTransfer.setData('dayIndex', dayIndex)
		e.dataTransfer.setData('eventType', event)
		e.currentTarget.classList.add(styles.dragging)
	}

	const handleDragEnd = (e) => {
		e.currentTarget.classList.remove(styles.dragging)
	}

	const handleDrop = (e, index) => {
		e.preventDefault()
		const startIndex = e.dataTransfer.getData('eventIndex')
		const startDayIndex = e.dataTransfer.getData('dayIndex')
		const startEventType = e.dataTransfer.getData('eventType')
		dragAndDropEvent({
			startIndex,
			startDayIndex: Number(startDayIndex),
			startEventType,
			index,
			eventType: event,
			dayIndex
		})
	}

	const handleDragOver = (e) => {
		e.preventDefault()
	}

	const handleClick = (e, modalEvent, index) => {
		setEventModal(modalEvent)
		setIndexEventModal(index)
		setOpen(true)
	}

	return (
		<div
			className={styles.dayEventsContainer}
			onDrop={handleDrop}
			onDragOver={handleDragOver}
		>
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
				{restaurants.map((el, index) => (
					<div key={el._id}>
						<DraggingCard
							item={el}
							index={index}
							handleDragStart={(e) => handleDragStart(e, el, index)}
							handleDrop={handleDrop}
							handleDragEnd={handleDragEnd}
							handleClick={handleClick}
							onDelete={() => handleDeleteEvent(dayIndex, event, el._id)}
						/>
					</div>
				))}
				<CardAdd
					renderAddCard={renderAddCard}
					name="restaurant"
					route="restaurant"
					timeOfEvent={event}
					dayOfEvent={dayIndex}
				/>
			</>
		</div>
	)
}
