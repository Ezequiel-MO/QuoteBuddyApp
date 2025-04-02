import { useEffect, useState, useCallback, useMemo } from 'react'
import accounting from 'accounting'
import { IEntertainment } from '../../../../../interfaces'
import { OptionSelect } from '../../multipleOrSingle'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { ToggleTableRowIcon } from '@components/atoms/ToggleTableRowIcon'
import { useCurrentProject } from 'src/hooks'
import { Icon } from '@iconify/react'
import { useUIContext } from '@screens/budget/context/UIContext'
import { NoteActionIcon } from '@screens/budget/components/NoteActionIcon'
import { EntityNoteRow } from '@screens/budget/components/EntityNoteRow'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface Props {
	date: string
	entertainment: IEntertainment[]
	selectedEntertainment: IEntertainment
	handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
	typeOfEvent: 'dinner' | 'lunch'
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const EntertainmentSummaryRow: React.FC<Props> = ({
	date,
	entertainment,
	selectedEntertainment,
	handleChange,
	typeOfEvent,
	isOpen,
	setIsOpen
}) => {
	const MySwal = withReactContent(Swal)

	// Access only what we need from the hooks
	const { currentProject, updateEntertainmentBudgetNote } = useCurrentProject()
	const { showActionIcons } = useUIContext()

	// State to hold the current note
	const [currentNote, setCurrentNote] = useState(
		selectedEntertainment?.budgetNotes || ''
	)

	// Update currentNote when selectedEntertainment changes
	useEffect(() => {
		setCurrentNote(selectedEntertainment?.budgetNotes || '')
	}, [selectedEntertainment])

	// Local state to track whether the note exists
	const [hasNote, setHasNote] = useState(
		!!(currentNote && currentNote.trim() !== '')
	)

	// Calculate total cost from entertainment price fields
	const totalCost = useMemo(() => {
		if (!selectedEntertainment?.price) return 0

		return Object.values(selectedEntertainment.price).reduce(
			(acc, val) => acc + (Number(val) || 0),
			0
		)
	}, [selectedEntertainment?.price])

	// Update hasNote when currentNote changes
	useEffect(() => {
		setHasNote(!!(currentNote && currentNote.trim() !== ''))
	}, [currentNote])

	const toggleBreakdown = () => {
		setIsOpen((prevState: boolean) => !prevState)
	}

	const multipleShows = entertainment?.length > 1

	// Handlers for note operations
	const handleNoteAdded = useCallback(
		(newNote: string) => {
			try {
				// Find the day index
				const dayIndex = currentProject.schedule.findIndex(
					(day) => day.date === date
				)

				// Find the restaurant for this type of event
				const restaurants =
					currentProject.schedule[dayIndex][typeOfEvent].restaurants

				// Try to find the restaurant containing the selected entertainment
				const restaurant = restaurants.find((rest) =>
					rest.entertainment?.some(
						(ent) => ent._id === selectedEntertainment._id
					)
				)

				if (!restaurant) {
					throw new Error('Restaurant not found for this entertainment')
				}

				// Immediately update local state
				setCurrentNote(newNote)
				setHasNote(!!newNote.trim())

				// Dispatch update to Redux
				updateEntertainmentBudgetNote({
					typeMeal: typeOfEvent,
					dayIndex,
					idRestaurant: restaurant._id,
					idEntertainment: selectedEntertainment._id,
					budgetNotes: newNote
				})
			} catch (error) {
				console.error('Error updating entertainment note:', error)
				MySwal.fire({
					title: 'Error',
					text: 'Could not update the note. Please try again.',
					icon: 'error'
				})
			}
		},
		[
			currentProject.schedule,
			date,
			typeOfEvent,
			selectedEntertainment?._id,
			updateEntertainmentBudgetNote,
			MySwal
		]
	)

	const handleNoteDeleted = useCallback(() => {
		try {
			// Find the day index
			const dayIndex = currentProject.schedule.findIndex(
				(day) => day.date === date
			)

			// Find the restaurant for this type of event
			const restaurants =
				currentProject.schedule[dayIndex][typeOfEvent].restaurants

			// Try to find the restaurant containing the selected entertainment
			const restaurant = restaurants.find((rest) =>
				rest.entertainment?.some((ent) => ent._id === selectedEntertainment._id)
			)

			if (!restaurant) {
				throw new Error('Restaurant not found for this entertainment')
			}

			// Immediately update local state
			setCurrentNote('')
			setHasNote(false)

			// Dispatch update to Redux with empty notes
			updateEntertainmentBudgetNote({
				typeMeal: typeOfEvent,
				dayIndex,
				idRestaurant: restaurant._id,
				idEntertainment: selectedEntertainment._id,
				budgetNotes: ''
			})
		} catch (error) {
			console.error('Error deleting entertainment note:', error)
			MySwal.fire({
				title: 'Error',
				text: 'Could not delete the note. Please try again.',
				icon: 'error'
			})
		}
	}, [
		currentProject.schedule,
		date,
		typeOfEvent,
		selectedEntertainment?._id,
		updateEntertainmentBudgetNote,
		MySwal
	])

	const handleNoteEdited = useCallback(
		(newNote: string) => {
			handleNoteAdded(newNote)
		},
		[handleNoteAdded]
	)

	return (
		<>
			<tr
				className={`${tableRowClasses} bg-gradient-to-r from-indigo-900/10 to-indigo-800/20 hover:from-indigo-900/20 hover:to-indigo-800/30 transition-colors duration-150 border-b border-indigo-900/30 group`}
			>
				<td className="w-14 pl-6">
					<ToggleTableRowIcon isOpen={isOpen} toggle={toggleBreakdown} />
				</td>
				<td className={`${tableCellClasses} flex items-center space-x-2 mt-3`}>
					<Icon icon="mdi:music" className="text-indigo-400" width={18} />
					<span className="text-gray-200">Entertainment</span>
				</td>
				<td className={tableCellClasses}>
					{multipleShows ? (
						<OptionSelect
							options={entertainment}
							value={selectedEntertainment?.name || ''}
							handleChange={handleChange}
						/>
					) : (
						<div className="text-gray-300 font-medium">
							{entertainment[0].name}
						</div>
					)}
				</td>
				<td className={tableCellClasses}>
					{selectedEntertainment?.nrArtists && (
						<span className="bg-indigo-800/40 text-indigo-100 font-semibold py-1 px-3 rounded-full text-sm">
							{selectedEntertainment.nrArtists} artists
						</span>
					)}
				</td>
				<td className={tableCellClasses}></td>
				<td className="text-gray-100 px-16 py-1 min-w-[80px]">
					<div className="flex items-center justify-center">
						<span>{accounting.formatMoney(totalCost, '€')}</span>

						{/* Note icon */}
						{showActionIcons && selectedEntertainment && (
							<NoteActionIcon
								entityId={selectedEntertainment._id || ''}
								entityName={`Entertainment: ${selectedEntertainment.name}`}
								entityType="entertainment"
								entitySubtype={typeOfEvent}
								date={date}
								currentNote={currentNote}
								className="ml-2"
								onNoteAdded={handleNoteAdded}
								iconColor="indigo"
							/>
						)}
					</div>
				</td>
			</tr>

			{/* Render note row if hasNote is true */}
			{hasNote && currentNote && (
				<EntityNoteRow
					note={currentNote}
					entityId={selectedEntertainment._id || ''}
					entityName={selectedEntertainment.name}
					entityType="entertainment"
					entitySubtype={typeOfEvent}
					date={date}
					onNoteDeleted={handleNoteDeleted}
					onNoteEdited={handleNoteEdited}
					borderColor="indigo"
					iconColor="indigo"
				/>
			)}
		</>
	)
}
