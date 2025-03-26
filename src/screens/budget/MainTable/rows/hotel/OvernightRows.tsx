// src/screens/budget/MainTable/rows/hotel/OvernightRows.tsx
import { useEffect, useState } from 'react'
import { IHotel } from '../../../../../interfaces'
import { OptionSelect } from '../../multipleOrSingle'
import accounting from 'accounting'
import { OvernightBreakdownRows } from './OvernightBreakdownRows'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { ToggleTableRowIcon } from '@components/atoms/ToggleTableRowIcon'
import { useCurrentProject } from 'src/hooks'
import { UpdateOvernightCostPayload } from 'src/redux/features/currentProject/types'
import { NoteActionIcon } from '@screens/budget/components/NoteActionIcon'
import { useUIContext } from '@screens/budget/context/UIContext'
import { EntityNoteRow } from '@screens/budget/components/EntityNoteRow'

interface Props {
	date: string
	hotels: IHotel[]
}

export const OvernightRows = ({ date, hotels }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [selectedHotel, setSelectedHotel] = useState<IHotel>(hotels[0])
	const { showActionIcons } = useUIContext()

	const {
		budget: { overnight },
		updateBudgetOvernightCost
	} = useCurrentProject()

	const hotelCost = overnight[date]?.hotelCost ?? 0

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

	useEffect(() => {
		if (date) {
			const payload: UpdateOvernightCostPayload = {
				date,
				hotel: selectedHotel
			}
			updateBudgetOvernightCost(payload)
		}
	}, [date, selectedHotel])

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedHotelName = e.target.value
		const foundHotel = hotels.find((hotel) => hotel.name === selectedHotelName)
		if (foundHotel) {
			setSelectedHotel(foundHotel)
		}
	}

	const toggleBreakdown = () => {
		setIsOpen((prevState: boolean) => !prevState)
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
		setHasNote(!!newNote.trim())
	}

	if (!hotels || hotels.length === 0) return null

	return (
		<>
			<tr className={tableRowClasses}>
				<ToggleTableRowIcon isOpen={isOpen} toggle={toggleBreakdown} />
				<td className={tableCellClasses}>{`Overnight @(${date})`}</td>
				<td>
					{
						<OptionSelect
							options={hotels}
							value={selectedHotel?.name || hotels[0]?.name}
							handleChange={handleChange}
						/>
					}
				</td>
				<td></td>
				<td></td>
				<td className="flex items-center justify-between">
					<span>{accounting.formatMoney(hotelCost, '€')}</span>

					{/* Add action icon for notes if on project schedule page */}
					{showActionIcons && selectedHotel && (
						<NoteActionIcon
							entityId={selectedHotel._id || ''}
							entityName={selectedHotel.name}
							entityType="overnightHotel"
							date={date}
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
					entityType="overnightHotel"
					date={date}
					onNoteDeleted={handleNoteDeleted}
					onNoteEdited={handleNoteEdited}
					borderColor="blue"
					iconColor="blue"
				/>
			)}

			<OvernightBreakdownRows
				selectedHotel={selectedHotel}
				setSelectedHotel={setSelectedHotel}
				isOpen={isOpen}
				date={date}
			/>
		</>
	)
}
