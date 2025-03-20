import { useEffect, useState } from 'react'
import { IEvent, IRestaurant } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import accounting from 'accounting'
import { OptionSelect } from '../../../MainTable/multipleOrSingle/OptionSelect'
import { EditableCell } from './EditableCell'
import { getDayIndex, existActivity } from '../../../helpers'
import { useCurrentProject } from 'src/hooks'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
	UpdateMorningActivityPayload,
	UpdateProgramActivitiesCostPayload
} from 'src/redux/features/currentProject/types'

interface MorningEventsRowProps {
	items: IEvent[]
	date: string
	pax: number
	selectedEvent: IEvent
	setSelectedEvent: React.Dispatch<React.SetStateAction<IEvent | IRestaurant>>
}

export const MorningEventsRow = ({
	items,
	date,
	pax,
	selectedEvent,
	setSelectedEvent
}: MorningEventsRowProps) => {
	const mySwal = withReactContent(Swal)

	const NoEvents = items.length === 0
	if (NoEvents) return null

	const {
		currentProject,
		updateBudgetProgramActivitiesCost,
		updateMorningActivity
	} = useCurrentProject()

	useEffect(() => {
		const payload: UpdateProgramActivitiesCostPayload = {
			date,
			activity: selectedEvent ? selectedEvent : null,
			pax: selectedEvent?.participants || pax,
			type: 'morning'
		}
		updateBudgetProgramActivitiesCost(payload)
	}, [date, selectedEvent])

	const [nrUnits, setNrUnits] = useState(
		selectedEvent?.pricePerPerson ? selectedEvent?.participants || pax : 1
	)
	useEffect(() => {
		setNrUnits(
			selectedEvent?.pricePerPerson ? selectedEvent?.participants || pax : 1
		)
	}, [selectedEvent])

	const dayIndex = getDayIndex(date, currentProject.schedule.length)
	const originalActivity = currentProject.schedule[
		dayIndex
	].morningEvents?.events.find((el) => el._id === selectedEvent?._id)

	const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
		const newValue = e.target.value as string
		const newSelectedEvent =
			items && items.find((item) => item.name === newValue)
		if (newSelectedEvent) {
			setSelectedEvent(newSelectedEvent)
		}
	}

	const handleUpdate = async (
		newValue: number,
		typeValue: 'unit' | 'price'
	) => {
		try {
			if (typeValue === 'unit' && newValue > pax) {
				throw Error(
					'Error! cannot be greater than the total number of passengers.'
				)
			}
			let dayIndex = getDayIndex(date, currentProject.schedule.length)
			const isActivity = existActivity(
				dayIndex,
				currentProject,
				'morningEvents',
				selectedEvent._id
			)
			if (!isActivity) {
				throw Error('Activity not found')
			}
			const payload: UpdateMorningActivityPayload = {
				value: newValue,
				dayIndex,
				id: selectedEvent._id,
				key: typeValue === 'unit' ? 'participants' : 'price'
			}
			updateMorningActivity(payload)
			const key = typeValue === 'unit' ? 'participants' : 'price'
			const copySelectedEvent = { ...selectedEvent }
			copySelectedEvent[key] = newValue ? newValue : 1
			setSelectedEvent(copySelectedEvent)
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

	return (
		<tr
			className={`${tableRowClasses} hover:bg-gray-700/20 transition-colors duration-150`}
		>
			<td className={tableCellClasses}></td>
			<td
				className={`${tableCellClasses} min-w-[200px] text-gray-100`}
			>{`Morning Event options`}</td>
			<td className={tableCellClasses}>
				<OptionSelect
					options={items}
					value={selectedEvent?.name || ''}
					handleChange={(e) => handleSelectChange(e)}
				/>
			</td>
			<td className={tableCellClasses}>
				{selectedEvent?.pricePerPerson && (
					<EditableCell
						value={
							selectedEvent?.participants ? selectedEvent?.participants : pax
						}
						originalValue={originalActivity?.participants || pax}
						typeValue="unit"
						onSave={(newValue) => handleUpdate(newValue, 'unit')}
					/>
				)}
			</td>
			<td className={tableCellClasses}>
				<EditableCell
					value={selectedEvent?.price as number}
					originalValue={originalActivity?.price || 0}
					typeValue="price"
					onSave={(newValue) => handleUpdate(newValue, 'price')}
				/>
			</td>
			<td
				className={`${tableCellClasses} text-gray-100 px-2 py-1 min-w-[80px]`}
			>
				{accounting.formatMoney(
					(selectedEvent?.price as number) * nrUnits,
					'€'
				)}
			</td>
		</tr>
	)
}
