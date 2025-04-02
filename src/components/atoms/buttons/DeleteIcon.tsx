import { FC, MouseEvent, useState } from 'react'
import { Icon } from '@iconify/react'

interface DeleteIconProps {
	onDelete?: (id: string) => void
	id: string
}

export const DeleteIcon: FC<DeleteIconProps> = ({ onDelete, id }) => {
	const [isHovering, setIsHovering] = useState(false)

	const handleDeleteClick = (e: MouseEvent<HTMLSpanElement>) => {
		e.stopPropagation()
		onDelete && onDelete(id)
	}

	return (
		<span
			role="button"
			className="inline-block ml-auto cursor-pointer text-gray-500 hover:text-gray-700 hover:scale-125 hover:transition hover:duration-150 hover:ease-in-out"
			onClick={handleDeleteClick}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			aria-label="Delete item"
		>
			<Icon icon="lucide:delete" color="#ea5933" />
		</span>
	)
}
