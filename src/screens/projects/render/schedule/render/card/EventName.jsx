import PropTypes from 'prop-types'

export const EventName = ({
	event,
	index,
	handleClick,
	listeners,
	isDragging
}) => {
	const styles = {
		text: 'cursor-grab',
		dragging: 'cursor-grabbing',
		notDragging: 'cursor-grab'
	}
	const handleNameClick = (e) => {
		handleClick(e, event, index)
	}

	return (
		<p
			{...listeners}
			className={`${styles.text} ${isDragging ? styles.dragging : null} truncate`}
			onDoubleClick={handleNameClick}
		>
			{event.name}
		</p>
	)
}

EventName.propTypes = {
	event: PropTypes.shape({
		name: PropTypes.string.isRequired
	}).isRequired,
	index: PropTypes.number.isRequired,
	handleClick: PropTypes.func.isRequired,
	listeners: PropTypes.object,
	isDragging: PropTypes.bool.isRequired
}