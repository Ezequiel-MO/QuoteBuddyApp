// src/screens/budget/MainTable/rows/transfers_in/TransfersInRow.tsx
import { useState, useEffect } from 'react'
import accounting from 'accounting'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCellTransfer } from './EditableCellTransfer'
import { ITransfer } from '../../../../../interfaces'
import { useCurrentProject } from 'src/hooks'
import { UpdateTransfersInPayload } from 'src/redux/features/currentProject/types'
import { useUIContext } from '@screens/budget/context/UIContext'
import { NoteActionIcon } from '@screens/budget/components/NoteActionIcon'
import { EntityNoteRow } from '@screens/budget/components/EntityNoteRow'
import { TRANSFER_CONFIGS } from '@screens/budget/constants/budgetNotesTransfersInOutConfig'
import { AddTransfersActionIcon } from '@screens/budget/components/AddTransfersActionIcon'
import { useTransfers } from '@screens/projects/add/toProject/transfers/render/context'

interface TransfersInRowProps {
	items: ITransfer[]
	date: string
}

// Define the config for easier access
const config = TRANSFER_CONFIGS.transfer_in

export const TransfersInRow = ({ items, date }: TransfersInRowProps) => {
	const [originalUnit] = useState(items.length)
	const [originalPrice] = useState(items[0].transfer_in)
	const { showActionIcons } = useUIContext()
	const { updateTransfersIn, updateTransferBudgetNote } = useCurrentProject()
	const { setOpen, setTypeTransfer } = useTransfers()

	// State to track if the transfer has a note
	const [hasNote, setHasNote] = useState(
		!!(items[0]?.budgetNotes && items[0]?.budgetNotes.trim() !== '')
	)

	// Update hasNote when items change
	useEffect(() => {
		setHasNote(!!(items[0]?.budgetNotes && items[0]?.budgetNotes.trim() !== ''))
	}, [items])

	const handleUpdate = (
		value: number,
		typeUpdate: 'transfer' | 'priceTransfer',
		id?: string
	) => {
		const payload: UpdateTransfersInPayload = {
			value,
			typeUpdate,
			id: id || ''
		}
		updateTransfersIn(payload)
	}

	// Handlers for note operations
	const handleNoteAdded = (newNote: string) => {
		setHasNote(true)
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_in',
			transferId: items[0]._id,
			budgetNotes: newNote,
			transferType: config.entitySubtype
		})
	}

	const handleNoteDeleted = () => {
		setHasNote(false)
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_in',
			transferId: items[0]._id,
			budgetNotes: '',
			transferType: config.entitySubtype
		})
	}

	const handleNoteEdited = (newNote: string) => {
		setHasNote(!!newNote.trim())
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_in',
			transferId: items[0]._id,
			budgetNotes: newNote,
			transferType: config.entitySubtype
		})
	}

	// Construct a more descriptive entity name for this specific row instance
	const entityNameForRow = `${config.entityName}: ${items[0].vehicleType} (${items[0].vehicleCapacity} seater)`

	// Add hover state to component
	const [isHovered, setIsHovered] = useState(false)

	const handleConfigureTransfers = () => {
		setTypeTransfer('in')
		setOpen(true)
	}

	return (
		<>
			<tr
				className={`${tableRowClasses} hover:bg-gray-700/20 transition-colors duration-150 group`}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<td className={tableCellClasses}></td>
				<td className={`${tableCellClasses} min-w-[200px] text-gray-100`}>
					{config.entityName}
				</td>
				<td
					className={`${tableCellClasses} text-gray-100`}
				>{`${items[0].vehicleCapacity} Seater ${items[0].vehicleType}`}</td>
				<td className={tableCellClasses}>
					<EditableCellTransfer
						value={items.length}
						originalValue={originalUnit}
						typeValue="unit"
						onSave={(newValue) =>
							handleUpdate(newValue, 'transfer', items[0]._id)
						}
					/>
				</td>
				<td className={tableCellClasses}>
					{
						<EditableCellTransfer
							value={items[0].transfer_in}
							originalValue={originalPrice}
							typeValue="price"
							onSave={(newValue) =>
								handleUpdate(newValue, 'priceTransfer', items[0]._id)
							}
						/>
					}
				</td>
				<td className="text-gray-100 px-16 py-1 min-w-[80px]">
					<div className="flex items-center justify-center">
						<span>
							{accounting.formatMoney(items[0].transfer_in * items.length, '€')}
						</span>

						{/* Add note icon */}
						{showActionIcons && items[0] && (
							<>
								<NoteActionIcon
									entityId={items[0]._id || ''}
									entityName={entityNameForRow}
									entityType={config.entityType}
									entitySubtype={config.entitySubtype}
									date={date}
									currentNote={items[0].budgetNotes || ''}
									className="ml-2"
									onNoteAdded={handleNoteAdded}
									iconColor={config.colors.icon}
								/>
								<AddTransfersActionIcon
									onClick={handleConfigureTransfers}
									isVisible={isHovered}
								/>
							</>
						)}
					</div>
				</td>
			</tr>

			{/* Render note row if hasNote is true */}
			{hasNote && items[0]?.budgetNotes && (
				<EntityNoteRow
					note={items[0].budgetNotes}
					entityId={items[0]._id || ''}
					entityName={entityNameForRow}
					entityType={config.entityType}
					entitySubtype={config.entitySubtype}
					date={date}
					onNoteDeleted={handleNoteDeleted}
					onNoteEdited={handleNoteEdited}
					borderColor={config.colors.border}
					iconColor={config.colors.icon}
				/>
			)}
		</>
	)
}
