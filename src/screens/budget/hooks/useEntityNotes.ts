// src/screens/budget/hooks/useEntityNotes.ts
import { useState, useEffect, useCallback } from 'react'
import { useCurrentProject } from '@hooks/index'
import { getDayIndex } from '../helpers'

interface UseEntityNotesParams {
	entityId: string
	entityName: string
	entityType: 'restaurant' | 'event' | 'hotel' | 'overnightHotel' | string
	entitySubtype?: 'lunch' | 'dinner' | 'morning' | 'afternoon' | string
	date: string
	initialNote?: string
}

export const useEntityNotes = ({
	entityId,
	entityName,
	entityType,
	entitySubtype,
	date,
	initialNote = ''
}: UseEntityNotesParams) => {
	const {
		currentProject,
		updateMorningActivity,
		updateAfternoonActivity,
		updateLunchRestaurant,
		updateDinnerRestaurant,
		updateHotelPrice,
		updateOvernightHotelPrice
	} = useCurrentProject()

	// Local state to track whether the note exists
	const [hasNote, setHasNote] = useState(
		!!(initialNote && initialNote.trim() !== '')
	)

	// Local state to track the current note content
	const [note, setNote] = useState(initialNote)

	// Update hasNote when the initialNote changes
	useEffect(() => {
		setHasNote(!!(initialNote && initialNote.trim() !== ''))
		setNote(initialNote)
	}, [initialNote])

	// Get the day index for the given date
	const getDayIndexForDate = useCallback(() => {
		try {
			return getDayIndex(date, currentProject.schedule.length)
		} catch (error) {
			console.error('Error getting day index:', error)
			return -1
		}
	}, [date, currentProject.schedule.length])

	// Get the appropriate update action based on entity type
	const getUpdateAction = useCallback(() => {
		switch (entityType) {
			case 'restaurant':
				return entitySubtype === 'lunch'
					? updateLunchRestaurant
					: updateDinnerRestaurant
			case 'event':
				return entitySubtype === 'morning'
					? updateMorningActivity
					: updateAfternoonActivity
			case 'hotel':
				return updateHotelPrice
			case 'overnightHotel':
				return updateOvernightHotelPrice
			default:
				console.warn(`No update action found for entity type: ${entityType}`)
				return null
		}
	}, [entityType, entitySubtype])

	// Update the entity with a new note
	const updateEntityWithNote = useCallback(
		(newNote: string) => {
			const dayIndex = getDayIndexForDate()
			if (
				dayIndex === -1 &&
				entityType !== 'hotel' &&
				entityType !== 'overnightHotel'
			)
				return

			try {
				if (entityType === 'hotel') {
					// Update regular hotel
					updateHotelPrice({
						idHotel: entityId,
						keyHotelPrice: 'budgetNotes',
						value: newNote
					})
				} else if (entityType === 'overnightHotel') {
					// Update overnight hotel
					if (dayIndex === -1) return
					updateOvernightHotelPrice({
						dayIndex,
						id: entityId,
						key: 'budgetNotes',
						value: newNote
					})
				} else {
					// Handle other entity types (restaurant/event)
					const key = 'budgetNotes'
					if (entityType === 'restaurant') {
						const updateFn =
							entitySubtype === 'lunch'
								? updateLunchRestaurant
								: updateDinnerRestaurant
						updateFn({
							value: newNote,
							dayIndex: dayIndex,
							id: entityId,
							key: key
						})
					} else if (entityType === 'event') {
						const updateFn =
							entitySubtype === 'morning'
								? updateMorningActivity
								: updateAfternoonActivity
						updateFn({
							value: newNote,
							dayIndex: dayIndex,
							id: entityId,
							key: key
						})
					}
				}

				setNote(newNote)
				setHasNote(!!newNote.trim())
			} catch (error) {
				console.error('Error updating note:', error)
				throw error
			}
		},
		[
			entityId,
			entityType,
			entitySubtype,
			date,
			getDayIndexForDate,
			updateHotelPrice,
			updateOvernightHotelPrice,
			updateLunchRestaurant,
			updateDinnerRestaurant,
			updateMorningActivity,
			updateAfternoonActivity
		]
	)
	// Handle callbacks for note operations
	const handleNoteAdded = useCallback(() => {
		setHasNote(true)
	}, [])

	const handleNoteDeleted = useCallback(() => {
		setHasNote(false)
		setNote('')
	}, [])

	const handleNoteEdited = useCallback((newNote: string) => {
		setNote(newNote)
		setHasNote(!!newNote.trim())
	}, [])

	return {
		note,
		hasNote,
		handleNoteAdded,
		handleNoteDeleted,
		handleNoteEdited,
		updateEntityWithNote
	}
}
