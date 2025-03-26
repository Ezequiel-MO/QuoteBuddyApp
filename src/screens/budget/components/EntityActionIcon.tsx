import React from 'react'
import { Icon } from '@iconify/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useLocation } from 'react-router-dom'

interface EntityActionIconProps {
	entityName: string
	entityId: string
	entityType: 'hotel' | 'restaurant' | 'event' | 'meeting'
	subType?: string
	date: string
	className?: string
	currentNote?: string
	onNoteAdded?: () => void
	onUpdateNote: (noteText: string) => void
}

export const EntityActionIcon: React.FC<EntityActionIconProps> = ({
	entityName,
	entityId,
	entityType,
	subType,
	date,
	className = '',
	currentNote = '',
	onNoteAdded,
	onUpdateNote
}) => {
	const MySwal = withReactContent(Swal)

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
			onUpdateNote(note)

			// If note is not empty and it's new, call the onNoteAdded callback
			if (note && !currentNote) {
				if (onNoteAdded) {
					onNoteAdded()
				}

				// Show success message for new notes
				MySwal.fire({
					title: 'Note Added',
					text: `Your note has been added. It will appear below the ${entityType}.`,
					icon: 'success',
					timer: 2000,
					showConfirmButton: false
				})
			}
		}
	}

	// Choose icon color based on entity type
	const getIconColor = () => {
		switch (entityType) {
			case 'restaurant':
				return 'amber'
			case 'event':
				return 'pink'
			case 'hotel':
				return 'blue'
			case 'meeting':
				return 'purple'
			default:
				return 'gray'
		}
	}

	const iconColor = getIconColor()

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
					className={`text-${iconColor}-400 hover:text-${iconColor}-300`}
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
