import { FC } from 'react'
import { Button } from './Button'

/**
 * Props for the CreateButton component
 */
interface CreateButtonProps {
	/** Title of the item to create (e.g., "User", "Project") */
	title: string
	/** Function to call when button is clicked */
	handleClick: () => void
}

/**
 * Button component for creating new items
 * Uses the Button component with create variant internally
 * @deprecated Consider using <Button variant="create"> directly for new implementations
 */
export const CreateButton: FC<CreateButtonProps> = ({ title, handleClick }) => {
	return (
		<Button variant="create" handleClick={handleClick} icon="mdi:plus-circle">
			Create New {title}
		</Button>
	)
}
