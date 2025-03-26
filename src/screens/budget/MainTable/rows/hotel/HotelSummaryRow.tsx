import React, { useEffect, useState } from 'react'
import { HotelTotalCost } from './HotelTotalCost'
import { OptionSelect } from '../../multipleOrSingle/OptionSelect'
import { useCurrentProject } from 'src/hooks'
import { ToggleTableRowIcon } from '@components/atoms/ToggleTableRowIcon'
import { CategoryIndicator } from '@screens/budget/CategoryIndicator'
import { NoteActionIcon } from '@screens/budget/components/NoteActionIcon'
import { useUIContext } from '@screens/budget/context/UIContext'
import { EntityNoteRow } from '@screens/budget/components/EntityNoteRow'

interface HotelSummaryRowProps {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const HotelSummaryRow: React.FC<HotelSummaryRowProps> = ({
	isOpen,
	setIsOpen
}) => {
	const {
		currentProject: { multiDestination = false, hotels = [], schedule },
		budget: { selectedHotel },
		setBudgetSelectedHotel,
		setBudgetSelectedHotelCost,
		updateBudgetMeetingsTotalCost,
		clearMeetingsBudget
	} = useCurrentProject()

	const { showActionIcons } = useUIContext()

	// State to track if the hotel has a note
	const [hasNote, setHasNote] = useState(
		!!(selectedHotel?.budgetNotes && selectedHotel.budgetNotes.trim() !== '')
	)

	// Update hasNote when selectedHotel changes
	useEffect(() => {
		setHasNote(
			!!(selectedHotel?.budgetNotes && selectedHotel.budgetNotes.trim() !== '')
		)
	}, [selectedHotel])

	if (!hotels || hotels.length === 0) {
		return null
	}

	const hotelName = selectedHotel?.name

	useEffect(() => {
		updateBudgetMeetingsTotalCost(0)
		clearMeetingsBudget()
		if (hotelName) {
			setBudgetSelectedHotelCost(selectedHotel, schedule.length - 1)
		}
	}, [selectedHotel])

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedHotelName = e.target.value
		const selectedHotel = hotels.find(
			(hotel) => hotel.name === selectedHotelName
		)
		if (selectedHotel) {
			setBudgetSelectedHotel(selectedHotel)
		}
	}

	// Handle the note being added
	const handleNoteAdded = () => {
		setHasNote(true)
	}

	// Handle the note being deleted
	const handleNoteDeleted = () => {
		setHasNote(false)
	}

	// Handle the note being edited
	const handleNoteEdited = (newNote: string) => {
		// This will be triggered by the EntityNoteRow component
		setHasNote(!!newNote.trim())
	}

	return (
		<>
			<tr className="bg-blue-900/20 border-b border-blue-800/40 hover:bg-blue-900/30 transition-all duration-200 backdrop-filter backdrop-blur-sm group">
				<ToggleTableRowIcon isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />
				<td className="py-5 px-6 font-medium text-white-0 flex items-center space-x-3">
					<CategoryIndicator type="accommodation" />
					<span className="text-blue-200 font-bold tracking-wide text-lg">
						{multiDestination ? 'Overnight @' : 'Accommodation'}
					</span>
				</td>
				<td className="py-5 px-4">
					{hotels?.length === 1 ? (
						<div className="font-medium text-white-0 text-lg">
							{hotelName || hotels[0]?.name}
						</div>
					) : (
						<div className="w-full max-w-md focus-within:ring-2 focus-within:ring-blue-400 rounded-md">
							<OptionSelect
								options={hotels}
								value={hotelName || hotels[0]?.name || ''}
								handleChange={handleChange}
							/>
						</div>
					)}
				</td>
				<td className="py-4 px-4"></td>
				<td className="py-4 px-4"></td>
				<td className="py-5 px-6 font-bold text-xl text-white-0 flex items-center justify-between">
					<HotelTotalCost />

					{/* Add action icon for notes if on project schedule page */}
					{showActionIcons && selectedHotel && (
						<NoteActionIcon
							entityId={selectedHotel._id || ''}
							entityName={selectedHotel.name}
							entityType="hotel"
							date={schedule[0]?.date || ''}
							currentNote={selectedHotel.budgetNotes || ''}
							className="ml-2"
							onNoteAdded={handleNoteAdded}
							iconColor="blue"
						/>
					)}
				</td>
			</tr>

			{/* Render note row if hasNote is true */}
			{hasNote && selectedHotel?.budgetNotes && (
				<EntityNoteRow
					note={selectedHotel.budgetNotes}
					entityId={selectedHotel._id || ''}
					entityName={selectedHotel.name}
					entityType="hotel"
					date={schedule[0]?.date || ''}
					onNoteDeleted={handleNoteDeleted}
					onNoteEdited={handleNoteEdited}
					borderColor="blue"
					iconColor="blue"
				/>
			)}
		</>
	)
}
