// src/screens/budget/components/EntityNoteRow.tsx
import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useLocation } from 'react-router-dom'
import { useEntityNotes } from '../hooks/useEntityNotes'

interface EntityNoteRowProps {
	note: string
	entityId: string
	entityName: string
	entityType:
		| 'restaurant'
		| 'event'
		| 'hotel'
		| 'overnightHotel'
		| 'gift'
		| string
	entitySubtype?: 'lunch' | 'dinner' | 'morning' | 'afternoon' | string
	date: string
	colSpan?: number
	onNoteDeleted?: () => void
	onNoteEdited?: (newNote: string) => void
	borderColor?: string
	iconColor?: string
}

export const EntityNoteRow: React.FC<EntityNoteRowProps> = ({
	note,
	entityId,
	entityName,
	entityType,
	entitySubtype,
	date,
	colSpan = 6,
	onNoteDeleted,
	onNoteEdited,
	borderColor = 'amber',
	iconColor = 'amber'
}) => {
	const MySwal = withReactContent(Swal)

	// Check if we're on the client route
	const location = useLocation()
	const isClientRoute = location.pathname.includes('/client')

	// Local state to track if this component should be visible
	const [isVisible, setIsVisible] = useState(true)

	const { updateEntityWithNote } = useEntityNotes({
		entityId,
		entityName,
		entityType,
		entitySubtype,
		date,
		initialNote: note
	})

	// If the note is an empty string, we shouldn't show this component
	useEffect(() => {
		if (!note || note.trim() === '') {
			setIsVisible(false)
		}
	}, [note])

	// If the component shouldn't be visible, don't render anything
	if (!isVisible) {
		return null
	}

	const handleDoubleClick = async () => {
		// If we're on the client route, don't allow editing
		if (isClientRoute) return

		// Open edit dialog with current note
		const result = await MySwal.fire({
			title: `Edit note for ${entityName}`,
			input: 'text',
			inputValue: note,
			inputPlaceholder: 'Enter a brief note (max one sentence)',
			inputAttributes: {
				maxlength: '120'
			},
			showCancelButton: true,
			confirmButtonText: 'Save',
			cancelButtonText: 'Cancel',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33'
		})

		if (result.isConfirmed) {
			const updatedNote = result.value.trim()
			if (updatedNote === '') {
				// If the note is now empty, hide this component immediately
				setIsVisible(false)
				if (onNoteDeleted) {
					onNoteDeleted()
				}
			}
			try {
				updateEntityWithNote(updatedNote)
				if (onNoteEdited) {
					onNoteEdited(updatedNote)
				}
			} catch (error) {
				console.error('Error updating note:', error)
				MySwal.fire({
					title: 'Error',
					text: 'Could not update the note. Please try again.',
					icon: 'error'
				})
			}
		}
	}

	const handleDelete = async () => {
		// Confirm before deleting
		const result = await MySwal.fire({
			title: 'Delete Note',
			text: 'Are you sure you want to delete this note?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Delete',
			cancelButtonText: 'Cancel',
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6'
		})

		if (result.isConfirmed) {
			// Hide this component immediately
			setIsVisible(false)
			if (onNoteDeleted) {
				onNoteDeleted()
			}
			try {
				updateEntityWithNote('') // Empty string to remove the note
			} catch (error) {
				console.error('Error deleting note:', error)
				MySwal.fire({
					title: 'Error',
					text: 'Could not delete the note. Please try again.',
					icon: 'error'
				})
			}
		}
	}

	return (
		<tr className="bg-gray-800/30 border-t border-gray-700/20 hover:bg-gray-700/30 transition-all duration-200 group">
			<td className="w-12"></td>
			<td colSpan={colSpan - 1} className="py-2 pl-6">
				<div
					className={`flex items-center justify-between ml-4 border-l-2 border-l-${borderColor}-500/40 pl-3`}
				>
					<div
						className={`flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-200 max-w-[90%] ${
							!isClientRoute ? 'cursor-pointer' : ''
						}`}
						onDoubleClick={isClientRoute ? undefined : handleDoubleClick}
						title={isClientRoute ? undefined : 'Double-click to edit'}
					>
						<Icon
							icon="mdi:note-text-outline"
							className={`mr-2 text-${iconColor}-500 flex-shrink-0`}
							width={18}
							height={18}
						/>
						<p className="text-sm font-medium overflow-hidden text-ellipsis">
							<span className={`text-${iconColor}-400 mr-2 italic`}>Note:</span>
							{note}
						</p>
					</div>
					{/* Only show delete button if not on client route */}
					{!isClientRoute && (
						<button
							onClick={handleDelete}
							className="text-gray-500 hover:text-red-400 transition-colors duration-200 opacity-0 group-hover:opacity-100"
							title="Delete note"
						>
							<Icon icon="mdi:trash-can-outline" width={16} height={16} />
						</button>
					)}
				</div>
			</td>
		</tr>
	)
}
