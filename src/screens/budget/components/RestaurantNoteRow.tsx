// src/screens/budget/components/RestaurantNoteRow.tsx
import React from 'react'
import { Icon } from '@iconify/react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getDayIndex } from '../helpers'
import { useCurrentProject } from '@hooks/index'

interface RestaurantNoteRowProps {
	note: string
	restaurantId: string
	restaurantName: string
	mealType: 'lunch' | 'dinner'
	date: string
	colSpan?: number
}

export const RestaurantNoteRow: React.FC<RestaurantNoteRowProps> = ({
	note,
	restaurantId,
	restaurantName,
	mealType,
	date,
	colSpan = 6
}) => {
	const MySwal = withReactContent(Swal)
	const { updateLunchRestaurant, updateDinnerRestaurant } = useCurrentProject()

	// Calculate the day index once for all operations
	const getDayIndexForDate = () => {
		try {
			return getDayIndex(date, Infinity) // We don't need the exact length here
		} catch (error) {
			console.error('Error getting day index:', error)
			return -1
		}
	}

	const handleDoubleClick = async () => {
		// Open edit dialog with current note
		const result = await MySwal.fire({
			title: `Edit note for ${restaurantName}`,
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
			updateNote(updatedNote)
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
			updateNote('') // Empty string to remove the note
		}
	}

	const updateNote = (newNote: string) => {
		const dayIndex = getDayIndexForDate()
		if (dayIndex === -1) return

		try {
			if (mealType === 'lunch') {
				updateLunchRestaurant({
					value: newNote,
					dayIndex,
					id: restaurantId,
					key: 'budgetNotes'
				})
			} else {
				updateDinnerRestaurant({
					value: newNote,
					dayIndex,
					id: restaurantId,
					key: 'budgetNotes'
				})
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

	return (
		<tr className="bg-gray-800/30 border-t border-gray-700/20 hover:bg-gray-700/30 transition-all duration-200 group">
			<td colSpan={colSpan} className="py-2 px-4">
				<div className="flex items-center justify-between">
					<div
						className="flex items-center text-gray-400 group-hover:text-gray-300 transition-colors duration-200 max-w-[90%]"
						onDoubleClick={handleDoubleClick}
						title="Double-click to edit"
					>
						<Icon
							icon="mdi:note-text-outline"
							className="mr-2 text-amber-500 flex-shrink-0"
							width={18}
							height={18}
						/>
						<p className="text-sm font-medium overflow-hidden text-ellipsis cursor-pointer">
							{note}
						</p>
					</div>
					<button
						onClick={handleDelete}
						className="text-gray-500 hover:text-red-400 transition-colors duration-200 opacity-0 group-hover:opacity-100"
						title="Delete note"
					>
						<Icon icon="mdi:trash-can-outline" width={16} height={16} />
					</button>
				</div>
			</td>
		</tr>
	)
}
