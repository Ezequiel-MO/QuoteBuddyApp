import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'

interface Props {
	onDelete: (id: string) => void
	id: string
}

export const DeleteIcon = ({ onDelete, id }: Props) => {
	const deletedIcon =
		'inline-block ml-auto cursor-pointer text-gray-500 hover:text-gray-700 hover:scale-125 hover:transition hover:duration-150 hover:ease-in-out'
	const handleDeleteClick = (e: React.MouseEvent<HTMLSpanElement>) => {
		e.stopPropagation()
		onDelete && onDelete(id)
	}

	return (
		<span role="button" className={deletedIcon} onClick={handleDeleteClick}>
			<Icon icon="lucide:delete" color="#ea5933" />
		</span>
	)
}

DeleteIcon.propTypes = {
	onDelete: PropTypes.func,
	id: PropTypes.string.isRequired
}
