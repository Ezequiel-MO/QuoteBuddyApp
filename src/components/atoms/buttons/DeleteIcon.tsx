import { FC, MouseEvent } from 'react'
import { Button } from './Button'

/**
 * Props for the DeleteIcon component
 */
interface DeleteIconProps {
	/** Function to call when delete button is clicked */
	onDelete?: (id: string) => void
	/** ID of the item to delete */
	id: string
}

/**
 * Icon button component for delete actions
 * Uses the Button component with ghost variant internally
 * @deprecated Consider using <Button variant="ghost" icon="lucide:delete"> directly for new implementations
 */
export const DeleteIcon: FC<DeleteIconProps> = ({ onDelete, id }) => {
	const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		onDelete && onDelete(id)
	}

	return (
		<Button
			variant="ghost"
			icon="lucide:delete"
			iconColor="#ea5933"
			handleClick={handleDeleteClick}
			className="inline-block ml-auto cursor-pointer hover:scale-125 hover:transition hover:duration-150 hover:ease-in-out"
			aria-label="Delete item"
		/>
	)
}
