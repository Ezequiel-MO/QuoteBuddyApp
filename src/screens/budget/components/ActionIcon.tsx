// src/screens/budget/components/ActionIcon.tsx
import { Icon } from '@iconify/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getDayIndex } from '../helpers'
import { useCurrentProject } from '@hooks/index'
import { useLocation } from 'react-router-dom'

interface ActionIconProps {
	entityName: string
	entityId: string
	entityType: 'restaurant'
	mealType: 'lunch' | 'dinner'
	date: string
	className?: string
	currentNote?: string
	onNoteAdded?: () => void // Callback for when a note is added/updated
}

export const ActionIcon: React.FC<ActionIconProps> = ({
	entityName,
	entityId,
	entityType,
	mealType,
	date,
	className = '',
	currentNote = '',
	onNoteAdded
}) => {
	const MySwal = withReactContent(Swal)
	const { updateLunchRestaurant, updateDinnerRestaurant, currentProject } =
		useCurrentProject()

	// Check if we're on the client route
	const location = useLocation()
	const isClientRoute = location.pathname.includes('/client')

	// If we're on client route, don't render the action icon
	if (isClientRoute) {
		return null
	}

	const handleClick = async (e: React.MouseEvent) => {
		e.stopPropagation()

		// Open SweetAlert2 dialog with text input
		const result = await MySwal.fire({
			title: `Add note for ${entityName}`,
			input: 'text',
			inputPlaceholder: 'Enter a brief note (max one sentence)',
			inputValue: currentNote,
			inputAttributes: {
				maxlength: '120', // Limiting to roughly one sentence
				'aria-label': 'Restaurant note'
			},
			showCancelButton: true,
			confirmButtonText: 'Save',
			cancelButtonText: 'Cancel',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			preConfirm: (note) => {
				return note.trim() // Return trimmed note for validation
			}
		})

		// If user clicked confirm and entered text
		if (result.isConfirmed) {
			const note = result.value
			console.log(`Updating note for ${entityName} (${entityId}): "${note}"`)

			try {
				const dayIndex = getDayIndex(date, currentProject.schedule.length)

				// Dispatch to Redux based on meal type
				if (mealType === 'lunch') {
					updateLunchRestaurant({
						value: note,
						dayIndex,
						id: entityId,
						key: 'budgetNotes'
					})
				} else if (mealType === 'dinner') {
					updateDinnerRestaurant({
						value: note,
						dayIndex,
						id: entityId,
						key: 'budgetNotes'
					})
				}

				// If we added a note (not empty), call the callback to update parent state
				if (note) {
					// Call the callback to notify parent component that a note has been added
					if (onNoteAdded) {
						onNoteAdded()
					}

					// If it's a new note, show success message
					if (!currentNote) {
						MySwal.fire({
							title: 'Note Added',
							text: 'Your note has been added. It will appear below the restaurant.',
							icon: 'success',
							timer: 2000,
							showConfirmButton: false
						})
					}
				}
			} catch (error) {
				console.error('Error updating restaurant note:', error)
				MySwal.fire({
					title: 'Error',
					text: 'Could not save the note. Please try again.',
					icon: 'error'
				})
			}
		}
	}

	return (
		<div
			className={`opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${className}`}
			onClick={handleClick}
			title="Add or edit note"
		>
			{currentNote ? (
				<Icon
					icon="mdi:note-edit"
					width={20}
					height={20}
					className="text-amber-400 hover:text-amber-300"
				/>
			) : (
				<Icon
					icon="mdi:note-plus"
					width={20}
					height={20}
					className="text-gray-400 hover:text-gray-200"
				/>
			)}
		</div>
	)
}
