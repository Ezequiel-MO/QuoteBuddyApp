import styles from '../../../DayEvents.module.css'

export const EventActivate = ({ event , id}) => {
	

	return (
		<div
			className={styles.cardActivate}
		>
            <p className="truncate">
                {event.name}
            </p>
		</div>
	)
}