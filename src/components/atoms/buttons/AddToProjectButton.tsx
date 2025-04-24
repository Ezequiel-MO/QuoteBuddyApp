import React, { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { errorToastOptions } from 'src/helper/toast'
import { Button } from './Button'

/**
 * Interface defining the props for the AddToProjectButton component
 */
interface AddToProjectButtonProps {
	onAddToProject: () => Promise<void> | void
}

/**
 * Button component that adds an item to the current project
 */
export const AddToProjectButton: FC<AddToProjectButtonProps> = ({
	onAddToProject
}) => {
	const [loading, setLoading] = useState(false)

	/**
	 * Handles the button click event, managing loading state
	 */
	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		setLoading(true)

		try {
			await onAddToProject()
		} catch (error: any) {
			console.error('Failed to add to project:', error)
			toast.error('Failed to add to project', errorToastOptions)
		} finally {
			setLoading(false)
		}
	}

	return (
		<td data-testid="add-to-project-button" className="p-0">
			<Button
				variant="project"
				icon="gg:insert-after-o"
				iconColor="#ea5933"
				handleClick={handleClick}
				widthIcon={24}
			>
				{loading ? 'Adding...' : 'Add to Project'}
			</Button>
		</td>
	)
}
