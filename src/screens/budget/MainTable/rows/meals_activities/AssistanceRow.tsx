import { useState, useEffect } from 'react'
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCell } from './EditableCell'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCurrentProject } from 'src/hooks'
import { UpdateAssistanceTransferActivityRestaurantPayload } from 'src/redux/features/currentProject/types'
import { NoteActionIcon } from '@screens/budget/components/NoteActionIcon'

interface AssistanceRowProps {
	firstItem: ITransfer
	date: string
	description: 'On Board Assistance' | 'En Route Assistance'
	id?: string
	idRestaunrantOrActivity?: string
	showNoteIcon?: boolean
	onNoteAdded?: (newNote: string) => void
	currentNote?: string // Accept current note from parent
}

export const AssistanceRow = ({
	firstItem,
	date,
	description,
	id,
	idRestaunrantOrActivity,
	showNoteIcon = false,
	onNoteAdded,
	currentNote = ''
}: AssistanceRowProps) => {
	const mySwal = withReactContent(Swal)
	const {
		currentProject: { schedule = [] },
		updateAssistanceTransferActivityRestaurant
	} = useCurrentProject()

	// State for assistance values
	const [assistance, setAssistance] = useState(
		firstItem.assistance ? firstItem.assistance : 0
	)
	const [assistanceCost, setAssistanceCost] = useState(
		firstItem.assistanceCost ? firstItem.assistanceCost : 0
	)

	// Extract transfer type from id if present (for note context)
	const transferType = id ? id.split('_')[1] : ''

	useEffect(() => {
		setAssistance(firstItem.assistance || 0)
		setAssistanceCost(firstItem.assistanceCost ? firstItem.assistanceCost : 0)
	}, [firstItem])

	const handleUpdate = async (
		value: number,
		type: 'assistance' | 'assistanceCost'
	) => {
		try {
			if (!idRestaunrantOrActivity)
				throw Error('activity or restaurant not found')
			let dayIndex: number | undefined
			let daySchedule = date.split(' ')
			switch (daySchedule[0]) {
				case 'Arrival':
					dayIndex = 0
					break
				case 'Day':
					dayIndex = parseInt(daySchedule[1]) - 1
					break
				case 'Departure':
					dayIndex = schedule.length - 1
					break
				default:
					dayIndex = undefined
					break
			}
			if (dayIndex === undefined) throw Error('day not found')
			const typeEvent = id?.split('_')[1] as
				| 'morningEvents'
				| 'afternoonEvents'
				| 'lunch'
				| 'dinner'
			if (!typeEvent) throw Error('Error in the Type of Event')

			type === 'assistance'
				? setAssistance(value <= 0 ? 1 : value)
				: setAssistanceCost(value <= 0 ? 1 : value)
			const payload: UpdateAssistanceTransferActivityRestaurantPayload = {
				value: value <= 0 ? 1 : value,
				dayIndex,
				id: idRestaunrantOrActivity,
				key: type,
				typeEvent
			}
			updateAssistanceTransferActivityRestaurant(payload)
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

	if (!firstItem) {
		return null
	}

	if (assistance === 0) {
		return null
	}

	// Handle the note added case safely
	const handleLocalNoteAdded = (newNote: string) => {
		if (onNoteAdded) {
			// Call the parent component's handler without modifying firstItem
			onNoteAdded(newNote)
		}
	}

	return (
		<tr
			className={`${tableRowClasses} hover:bg-gray-700/20 transition-colors duration-150 group`}
		>
			<td className={tableCellClasses}></td>
			<td></td>
			<td className={`${tableCellClasses} min-w-[200px] text-gray-100`}>
				{description}
			</td>
			<td className={tableCellClasses}>
				<EditableCell
					value={assistance}
					typeValue="unit"
					onSave={(newValue) => handleUpdate(newValue, 'assistance')}
				/>
			</td>
			<td className={tableCellClasses}>
				<EditableCell
					value={assistanceCost}
					typeValue="price"
					onSave={(newValue) => handleUpdate(newValue, 'assistanceCost')}
				/>
			</td>
			<td
				className={`${tableCellClasses} text-gray-100 px-16 py-1 min-w-[80px]`}
			>
				<div className="flex items-center justify-center">
					<span>
						{accounting.formatMoney(assistance * assistanceCost, '€')}
					</span>

					{/* Add note icon */}
					{showNoteIcon && (
						<NoteActionIcon
							entityId={firstItem._id || ''}
							entityName="On-board Assistance"
							entityType="transfer"
							entitySubtype={`assistance_${transferType}`}
							date={date}
							currentNote={currentNote || firstItem.assistanceBudgetNotes || ''}
							className="ml-2"
							onNoteAdded={handleLocalNoteAdded}
							iconColor="green"
						/>
					)}
				</div>
			</td>
		</tr>
	)
}
