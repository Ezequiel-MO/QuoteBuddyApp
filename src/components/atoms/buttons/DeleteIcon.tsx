import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import { useState } from 'react'

export const DeleteIcon = ({ onDelete, id }) => {
	const [isHovering, setIsHovering] = useState(false)

	const handleDeleteClick = (e) => {
		e.stopPropagation()
		onDelete && onDelete(id)
	}

	return (
		<button
			type="button"
			className={`
				inline-flex items-center justify-center p-1.5 rounded-full
				transition-all duration-200
				${
					isHovering
						? 'bg-red-500/20 text-red-400 transform scale-110'
						: 'bg-transparent text-gray-400 hover:text-red-400'
				}
			`}
			onClick={handleDeleteClick}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			title="Delete item"
		>
			<Icon
				icon={isHovering ? 'mdi:delete' : 'lucide:delete'}
				className="w-4 h-4"
			/>
		</button>
	)
}

DeleteIcon.propTypes = {
	onDelete: PropTypes.func,
	id: PropTypes.string
}
