import { useEffect, useState } from 'react'
import { IEvent, IRestaurant } from '../../../../../interfaces'
import { useContextBudget } from '../../../context/BudgetContext'
import { UPDATE_PROGRAM_ACTIVITIES_COST } from '../../../context/budgetReducer'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import accounting from 'accounting'
import { OptionSelect } from '../../../MainTable/multipleOrSingle/OptionSelect'
import { EditableCell } from './EditableCell'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getDayIndex, existActivity } from '../../../helpers'
import { useCurrentProject } from 'src/hooks'

interface Props {
	items: IEvent[]
	date: string
	pax: number
	selectedEvent: IEvent
	setSelectedEvent: React.Dispatch<React.SetStateAction<IEvent | IRestaurant>>
}

export const AfternoonEventsRow = ({
	items,
	date,
	pax,
	selectedEvent,
	setSelectedEvent
}: Props) => {
	const mySwal = withReactContent(Swal)

	const NoEvents = items.length === 0
	if (NoEvents) return null

	const { dispatch, state } = useContextBudget()
	const { currentProject } = useCurrentProject()

	const [nrUnits, setNrUnits] = useState(
		selectedEvent?.pricePerPerson ? selectedEvent?.participants || pax : 1
	)
	useEffect(() => {
		setNrUnits(
			selectedEvent?.pricePerPerson ? selectedEvent?.participants || pax : 1
		)
	}, [selectedEvent])

	useEffect(() => {
		dispatch({
			type: UPDATE_PROGRAM_ACTIVITIES_COST,
			payload: {
				date,
				activity: selectedEvent ? selectedEvent : null,
				pax: selectedEvent?.participants || pax,
				type: 'afternoon'
			}
		})
	}, [dispatch, date, selectedEvent])

	const dayIndex = getDayIndex(date, state)
	const originalActivity = currentProject?.schedule[
		dayIndex
	].afternoonEvents.events.find((el) => el._id === selectedEvent?._id)

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
				throw Error('Cannot be greater than the total number of passengers.')
			}
			let dayIndex = getDayIndex(date, state)
			existActivity(dayIndex, state, 'afternoonEvents', selectedEvent?._id)
			dispatch({
				type: 'UPDATE_AFTERNOON_ACTIVITY',
				payload: {
					value: newValue ? newValue : 1,
					dayIndex,
					id: selectedEvent._id,
					key: typeValue === 'unit' ? 'participants' : 'price'
				}
			})
			const key = typeValue === 'unit' ? 'participants' : 'price'
			const copySelectedEvent = { ...selectedEvent }
			copySelectedEvent[key] = newValue ? newValue : 1
			setSelectedEvent(copySelectedEvent)
		} catch (error: any) {
			console.log(error)
			await mySwal.fire({
				title: 'Error!',
				text: error?.message,
				icon: 'error',
				confirmButtonColor: 'green',
				allowEnterKey: false
			})
		}
	}

	return (
		<tr className={tableRowClasses}>
			<td className={tableCellClasses}>{date}</td>
			<td> {`Afternoon Event`} </td>
			<td>
				<OptionSelect
					options={items}
					value={selectedEvent?.name || ''}
					handleChange={(e) => handleSelectChange(e)}
				/>
			</td>
			<td>
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
			<td>
				<EditableCell
					value={selectedEvent.price as number}
					originalValue={originalActivity?.price || 0}
					typeValue="price"
					onSave={(newValue) => handleUpdate(newValue, 'price')}
				/>
			</td>
			<td>
				{accounting.formatMoney(
					(selectedEvent?.price as number) * nrUnits,
					'€'
				)}
			</td>
		</tr>
	)
}
