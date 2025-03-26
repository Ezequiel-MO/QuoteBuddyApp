import { FC, useState, useEffect } from 'react'
import { tableRowClasses } from 'src/constants/listStyles'
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
		const newSelectedGift =
			items && items.find((item) => item.name === newValue)
		if (newSelectedGift) {
			setSelectedGift(newSelectedGift)
			// Update note state when changing gifts
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
			const updatedGift = { ...selectedGift }
			updatedGift[keyGift] = newValue
			setSelectedGift(updatedGift)
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
	const handleNoteAdded = () => {
		setHasNote(true)
	}

	const handleNoteDeleted = () => {
		setHasNote(false)
	}

	const handleNoteEdited = (newNote: string) => {
		// Update local state with new note
		const updatedGift = { ...selectedGift, budgetNotes: newNote }
		setSelectedGift(updatedGift)

		// Update the note in Redux
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
			<tr className={tableRowClasses}>
				<td></td>
				<td className="text-lg">{`Gift`}</td>
				<td>
					<OptionSelect
						options={items}
						value={selectedGift?.name || ''}
						handleChange={(e) => handleSelectChange(e)}
					/>
				</td>
				<td>
					<EditableCell
						value={selectedGift?.qty || 1}
						originalValue={originalGift?.qty || 1}
						typeValue="unit"
						onSave={(newValue) => handleUpdate(newValue, 'qty')}
					/>
				</td>
				<td>
					<EditableCell
						value={selectedGift?.price}
						originalValue={originalGift?.price as number}
						typeValue="price"
						onSave={(newValue) => handleUpdate(newValue, 'price')}
					/>
				</td>
				<td className="flex items-center justify-between">
					<span>
						{accounting.formatMoney(
							selectedGift?.qty * selectedGift?.price,
							'€'
						)}
					</span>

					{/* Add note action icon */}
					{showActionIcons && selectedGift && (
						<NoteActionIcon
							entityId={selectedGift._id || ''}
							entityName={`Gift: ${selectedGift.name}`}
							entityType="gift"
							date={effectiveDate}
							currentNote={selectedGift.budgetNotes || ''}
							className="ml-2"
							onNoteAdded={handleNoteAdded}
							iconColor="red"
						/>
					)}
				</td>
			</tr>

			{/* Note row */}
			{hasNote && selectedGift?.budgetNotes && (
				<EntityNoteRow
					note={selectedGift.budgetNotes}
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
