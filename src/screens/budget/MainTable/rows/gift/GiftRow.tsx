import { FC, useState, useEffect } from 'react'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { OptionSelect } from '../../multipleOrSingle'
import { EditableCell } from '../meals_activities/EditableCell'
import { existGift } from '../../../helpers'
import accounting from 'accounting'
import { IGift } from 'src/interfaces/'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCurrentProject } from 'src/hooks'
import { UpdateGiftPayload } from 'src/redux/features/currentProject/types'
import { useUIContext } from '@screens/budget/context/UIContext'
import { NoteActionIcon } from '@screens/budget/components/NoteActionIcon'
import { EntityNoteRow } from '@screens/budget/components/EntityNoteRow'

interface GiftRowProps {
	items: IGift[]
	selectedGift: IGift
	setSelectedGift: React.Dispatch<React.SetStateAction<IGift>>
}

export const GiftRow: FC<GiftRowProps> = ({
	items,
	selectedGift,
	setSelectedGift
}) => {
	const mySwal = withReactContent(Swal)
	const { showActionIcons } = useUIContext()
	const { currentProject, updateGift } = useCurrentProject()

	// State to track if the gift has a note
	const [hasNote, setHasNote] = useState(
		!!(selectedGift?.budgetNotes && selectedGift.budgetNotes.trim() !== '')
	)

	// Update hasNote when selectedGift changes
	useEffect(() => {
		setHasNote(
			!!(selectedGift?.budgetNotes && selectedGift.budgetNotes.trim() !== '')
		)
	}, [selectedGift])

	const noGifts = items.length === 0
	if (noGifts) return null

	const originalGift = currentProject.gifts.find(
		(el: IGift) => el._id === selectedGift?._id
	)

	const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
		const newValue = e.target.value as string
		const newSelectedGift = items.find((item) => item.name === newValue)
		if (newSelectedGift) {
			setSelectedGift(newSelectedGift)
			setHasNote(
				!!(
					newSelectedGift.budgetNotes &&
					newSelectedGift.budgetNotes.trim() !== ''
				)
			)
		}
	}

	const handleUpdate = async (newValue: number, keyGift: 'qty' | 'price') => {
		try {
			existGift(items, selectedGift?._id as string)

			// Update local state first
			const updatedGift = { ...selectedGift }
			updatedGift[keyGift] = newValue
			setSelectedGift(updatedGift)

			// Then send to API
			const payload: UpdateGiftPayload = {
				value: newValue <= 0 ? 1 : newValue,
				idGift: selectedGift._id as string,
				keyGift
			}
			updateGift(payload)
		} catch (error: any) {
			console.log(error)
			await mySwal.fire({
				title: 'Error!',
				text: error.message,
				icon: 'error',
				confirmButtonColor: 'green'
			})
		}
	}

	// Handlers for note operations
	const handleNoteAdded = (newNote: string) => {
		setHasNote(true)
		setSelectedGift((prev) => ({ ...prev, budgetNotes: newNote }))
	}

	const handleNoteDeleted = () => {
		setHasNote(false)
	}

	const handleNoteEdited = (newNote: string) => {
		// Important: Update the local state with the new note
		const updatedGift = { ...selectedGift, budgetNotes: newNote }
		setSelectedGift(updatedGift)

		// Update in Redux/API
		try {
			const payload: UpdateGiftPayload = {
				value: newNote,
				idGift: selectedGift._id as string,
				keyGift: 'budgetNotes'
			}
			updateGift(payload)
		} catch (error) {
			console.error('Error updating gift note:', error)
		}
	}

	// Use arrival day as the date for the gift note
	const effectiveDate = currentProject.arrivalDay || ''

	return (
		<>
			{/* Main gift row with consistent styling for proper alignment */}
			<tr
				className={`${tableRowClasses} group hover:bg-gray-700/20 transition-colors duration-150`}
			>
				<td className={tableCellClasses}></td>
				<td
					className={`${tableCellClasses} min-w-[200px] text-gray-100`}
				>{`Gift Item`}</td>
				<td className={tableCellClasses}>
					<OptionSelect
						options={items}
						value={selectedGift?.name || ''}
						handleChange={(e) => handleSelectChange(e)}
					/>
				</td>
				<td className={tableCellClasses}>
					<EditableCell
						value={selectedGift?.qty || 1}
						originalValue={originalGift?.qty || 1}
						typeValue="unit"
						onSave={(newValue) => handleUpdate(newValue, 'qty')}
					/>
				</td>
				<td className={tableCellClasses}>
					<EditableCell
						value={selectedGift?.price}
						originalValue={originalGift?.price as number}
						typeValue="price"
						onSave={(newValue) => handleUpdate(newValue, 'price')}
					/>
				</td>
				<td className={`${tableCellClasses}`}>
					<div className="flex items-center justify-center">
						<span>
							{accounting.formatMoney(
								selectedGift?.qty * selectedGift?.price,
								'€'
							)}
						</span>

						{/* Note icon with improved visibility */}
						{showActionIcons && selectedGift && (
							<NoteActionIcon
								entityId={selectedGift._id || ''}
								entityName={`Gift: ${selectedGift.name}`}
								entityType="gift"
								date={effectiveDate}
								currentNote={selectedGift.budgetNotes || ''}
								className="ml-2"
								iconColor="red"
								onNoteAdded={handleNoteAdded}
							/>
						)}
					</div>
				</td>
			</tr>

			{/* Note row - render even if hasNote is true but we're still waiting for budgetNotes to be updated */}
			{(hasNote || selectedGift?.budgetNotes) && (
				<EntityNoteRow
					note={selectedGift.budgetNotes || ''}
					entityId={selectedGift._id || ''}
					entityName={selectedGift.name}
					entityType="gift"
					date={effectiveDate}
					onNoteDeleted={handleNoteDeleted}
					onNoteEdited={handleNoteEdited}
					borderColor="red"
					iconColor="red"
				/>
			)}
		</>
	)
}
