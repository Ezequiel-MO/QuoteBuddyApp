import React, { FC, useState } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { errorToastOptions } from '@helper/toast'

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
	const handleClick = async (
		e: React.MouseEvent<HTMLTableCellElement, MouseEvent>
	) => {
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
		<td
			data-testid="add-to-project-button"
			className="cursor-pointer flex flex-row items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors rounded-md"
			onClick={handleClick}
		>
			<Icon icon="gg:insert-after-o" color="#ea5933" width="24" height="24" />
			<span className="text-sm font-medium text-gray-400">
				{loading ? 'Adding...' : 'Add to Project'}
			</span>
		</td>
	)
}
