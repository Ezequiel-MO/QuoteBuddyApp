import PropTypes from 'prop-types'

export const EventName = ({
	event,
	index,
	handleClick,
	listeners,
	isDragging
}) => {
	const handleNameClick = (e) => {
		handleClick(e, event, index)
	}

	return (
		<p
			{...listeners}
			className={`
				truncate font-medium text-white-0 group-hover:text-cyan-200 transition-colors duration-200
				${
					isDragging
						? 'text-white-0 cursor-grabbing'
						: 'cursor-grab hover:text-cyan-100'
				}
			`}
			onDoubleClick={handleNameClick}
			title={event.name}
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
