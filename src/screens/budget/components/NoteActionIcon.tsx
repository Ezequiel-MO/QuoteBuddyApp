// src/screens/budget/components/NoteActionIcon.tsx
import React from 'react'
import { Icon } from '@iconify/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useEntityNotes } from '../hooks/useEntityNotes'
import { useUIContext } from '../context/UIContext'

interface NoteActionIconProps {
	entityId: string
	entityName: string
	entityType:
		| 'restaurant'
		| 'event'
		| 'hotel'
		| 'overnightHotel'
		| 'gift'
		| 'entertainment'
		| string
	entitySubtype?: 'lunch' | 'dinner' | 'morning' | 'afternoon' | string
	date: string
	currentNote?: string
	className?: string
	onNoteAdded?: (newNote: string) => void
	iconColor?: string
}

export const NoteActionIcon: React.FC<NoteActionIconProps> = ({
	entityId,
	entityName,
	entityType,
	entitySubtype,
	date,
	currentNote = '',
	className = '',
	onNoteAdded,
	iconColor = 'gray'
}) => {
	const MySwal = withReactContent(Swal)
	const { isEditable } = useUIContext()

	// If not in editable mode, don't render the action icon
	if (!isEditable) {
		return null
	}

	const { updateEntityWithNote } = useEntityNotes({
		entityId,
		entityName,
		entityType,
		entitySubtype,
		date,
		initialNote: currentNote
	})

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
				'aria-label': `${entityType} note`
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

			try {
				updateEntityWithNote(note)

				// If we added a note (not empty), call the callback to update parent state
				if (note) {
					// Call the callback to notify parent component that a note has been added
					if (onNoteAdded) {
						onNoteAdded(note)
					}

					// If it's a new note, show success message
					if (!currentNote) {
						MySwal.fire({
							title: 'Note Added',
							text: `Your note has been added. It will appear below the ${entityType}.`,
							icon: 'success',
							timer: 2000,
							showConfirmButton: false
						})
					}
				}
			} catch (error) {
				console.error(`Error updating ${entityType} note:`, error)
				MySwal.fire({
					title: 'Error',
					text: 'Could not save the note. Please try again.',
					icon: 'error'
				})
			}
		}
	}

	// Determine icon color based on entity type and whether a note exists
	const getDisplayColor = () => {
		if (currentNote) {
			if (entityType === 'restaurant') return 'amber'
			if (entityType === 'event') return 'pink'
			if (entityType === 'hotel' || entityType === 'overnightHotel')
				return 'blue'
			if (entityType === 'gift') return 'red'
			return iconColor
		}
		return 'gray'
	}

	const displayColor = getDisplayColor()

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
					className={`text-${displayColor}-400 hover:text-${displayColor}-300`}
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
