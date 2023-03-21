import { Icon } from '@iconify/react'
import styles from './DayEvents.module.css'
import { useCurrentProject } from '../../../../../hooks'

export const DayEvents = ({ day, event, handleDeleteEvent, dayIndex }) => {
	const { dragAndDropEvent } = useCurrentProject()

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

	return (
		<div
			className={styles.dayEventsContainer}
			onDrop={(e) => handleDropEmpty(e)}
			onDragOver={(e) => handleDragOver(e)}
		>
			{day[event].map((el, index) => {
				return (
					<div
						key={el._id}
						className={styles.list}
						draggable
						onDragStart={(e) => handleDragStart(e, el, index, dayIndex, event)}
						onDragEnd={(e) => handleDragEnd(e)}
						onDrop={(e) => handleDrop(e, index)}
						onDragOver={(e) => handleDragOver(e)}
					>
						<p className="text-lg">{el.name || el.hotelName}</p>
						<span
							className={styles.deleted}
							onClick={() => handleDeleteEvent(dayIndex, event, el._id)}
						>
							<Icon icon="lucide:delete" color="#ea5933" />
						</span>
					</div>
				)
			})}
		</div>
	)
}
