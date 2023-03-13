import { Icon } from '@iconify/react'
import styles from './render.module.css'

export const DayEvents = ({ day, event, handleDeleteEvent, dayIndex }) => {
	const handleDragStart = (e, el, index, event) => {
		console.log('onDragStart:', e, 'elemento arrastrado', el)
		console.log('dayOfEvent', index, 'timeOfEvent', event)
	}

	const handleDrop = (e, el, index, event) => {
		console.log('onDrop:', e, 'elemento dejado', el)
		console.log('dayOfEvent', index, 'timeOfEvent', event)
	}

	const handleDragOver = (e) => {
		e.preventDefault()
	}

	return (
		<>
			{day[event].map((el) => {
				return (
					<div
						key={el._id}
						className={styles.list}
						draggable
						onDragStart={(e) => handleDragStart(e, el, dayIndex, event)}
						onDrop={(e) => handleDrop(e, el, dayIndex, event)}
						onDragOver={(e) => handleDragOver(e)}
					>
						<p style={{ fontSize: '16px' }}>{el.name}</p>
						<span
							className={styles.deleted}
							onClick={() => handleDeleteEvent(dayIndex, event, el._id)}
						>
							<Icon icon="lucide:delete" color="#ea5933" />
						</span>
					</div>
				)
			})}
		</>
	)
}
