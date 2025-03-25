import { Icon } from '@iconify/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getDayIndex } from '../helpers'
import { useCurrentProject } from '@hooks/index'

interface ActionIconProps {
	entityName: string
	entityId: string
	entityType: 'restaurant'
	mealType: 'lunch' | 'dinner'
	date: string
	className?: string
	currentNote?: string
}

export const ActionIcon: React.FC<ActionIconProps> = ({
	entityName,
	entityId,
	entityType,
	mealType,
	date,
	className = '',
	currentNote = ''
}) => {
	const MySwal = withReactContent(Swal)
	const { updateLunchRestaurant, updateDinnerRestaurant } = useCurrentProject()

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
				const dayIndex = getDayIndex(date, Infinity) // We don't need exact length, just the formula

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
		>
			<Icon
				icon="mdi:dots-vertical"
				width={20}
				height={20}
				className="text-gray-400 hover:text-gray-200"
			/>
		</div>
	)
}
