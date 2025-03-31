// src/screens/budget/MainTable/rows/transfers_out/TransfersOutRow.tsx
import { useState, useEffect } from 'react'
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCellTransfer } from '../transfers_in/EditableCellTransfer'
import { useCurrentProject } from 'src/hooks'
import { UpdateTransfersOutPayload } from 'src/redux/features/currentProject/types'
import { useUIContext } from '@screens/budget/context/UIContext'
import { NoteActionIcon } from '@screens/budget/components/NoteActionIcon'
import { EntityNoteRow } from '@screens/budget/components/EntityNoteRow'

interface TransfersOutRowProps {
	items: ITransfer[]
	date: string
}

export const TransfersOutRow = ({ items, date }: TransfersOutRowProps) => {
	const { updateTransfersOut, updateTransferBudgetNote } = useCurrentProject()
	const { showActionIcons } = useUIContext()

	// State to track if the transfer has a note
	const [hasNote, setHasNote] = useState(
		!!(items[0]?.budgetNotes && items[0]?.budgetNotes.trim() !== '')
	)

	const [originalUnit] = useState(items.length)
	const [originalPrice] = useState(items[0].transfer_out)

	// Update hasNote when items change
	useEffect(() => {
		setHasNote(!!(items[0]?.budgetNotes && items[0]?.budgetNotes.trim() !== ''))
	}, [items])

	const handleUpdate = (
		value: number,
		typeUpdate: 'transfer' | 'priceTransfer',
		id?: string
	) => {
		const payload: UpdateTransfersOutPayload = {
			value: value === 0 ? 1 : value,
			typeUpdate,
			id: id || ''
		}
		updateTransfersOut(payload)
	}

	// Handlers for note operations
	const handleNoteAdded = (newNote: string) => {
		setHasNote(true)
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_out',
			transferId: items[0]._id,
			budgetNotes: newNote,
			transferType: 'main'
		})
	}

	const handleNoteDeleted = () => {
		setHasNote(false)
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_out',
			transferId: items[0]._id,
			budgetNotes: '',
			transferType: 'main'
		})
	}

	const handleNoteEdited = (newNote: string) => {
		setHasNote(!!newNote.trim())
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_out',
			transferId: items[0]._id,
			budgetNotes: newNote,
			transferType: 'main'
		})
	}

	return (
		<>
			<tr
				className={`${tableRowClasses} hover:bg-gray-700/20 transition-colors duration-150 group`}
			>
				<td className={tableCellClasses}></td>
				<td className={`${tableCellClasses} min-w-[200px] text-gray-100`}>
					Transfer To Airport
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
					<EditableCellTransfer
						value={items[0].transfer_out}
						originalValue={originalPrice}
						typeValue="price"
						onSave={(newValue) =>
							handleUpdate(newValue, 'priceTransfer', items[0]._id)
						}
					/>
				</td>
				<td className="text-gray-100 px-16 py-1 min-w-[80px]">
					<div className="flex items-center justify-center">
						<span>
							{accounting.formatMoney(
								items[0].transfer_out * items.length,
								'€'
							)}
						</span>

						{/* Add note icon */}
						{showActionIcons && items[0] && (
							<NoteActionIcon
								entityId={items[0]._id || ''}
								entityName={`Transfer: ${items[0].vehicleType} (${items[0].vehicleCapacity} seater)`}
								entityType="transfer"
								entitySubtype="transfer_out"
								date={date}
								currentNote={items[0].budgetNotes || ''}
								className="ml-2"
								onNoteAdded={handleNoteAdded}
								iconColor="green"
							/>
						)}
					</div>
				</td>
			</tr>

			{/* Render note row if hasNote is true */}
			{hasNote && items[0]?.budgetNotes && (
				<EntityNoteRow
					note={items[0].budgetNotes}
					entityId={items[0]._id || ''}
					entityName={`Transfer: ${items[0].vehicleType}`}
					entityType="transfer"
					entitySubtype="transfer_out"
					date={date}
					onNoteDeleted={handleNoteDeleted}
					onNoteEdited={handleNoteEdited}
					borderColor="green"
					iconColor="green"
				/>
			)}
		</>
	)
}
