import { useEffect, useState } from 'react'
import { MultipleChoiceCells, OptionSelect, SingleChoiceCells } from '../../multipleOrSingle'
import { useContextBudget } from '../../../context/BudgetContext'
import { IRestaurant, IEvent } from '../../../../../interfaces'
import { VenueBreakdownRows } from '../venue'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCell } from './EditableCell'
import accounting from 'accounting'
import { getVenuesCost } from 'src/helper/budget/getVenuesCost'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


interface DinnerRowProps {
	items: IRestaurant[]
	date: string
	pax: number
	selectedEvent: IRestaurant
	setSelectedEvent: React.Dispatch<React.SetStateAction<IEvent | IRestaurant>>
}

export const DinnerRow = ({
	items,
	date,
	pax,
	selectedEvent,
	setSelectedEvent
}: DinnerRowProps) => {
	const mySwal = withReactContent(Swal)

	const { dispatch, state } = useContextBudget()

	const [nrUnits, setNrUnits] = useState(selectedEvent.participants || pax)
	useEffect(() => {
		setNrUnits(selectedEvent.participants || pax)
	}, [selectedEvent])

	const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
		const newValue = e.target.value as string
		const newSelectedEvent =
			items && items.find((item) => item.name === newValue)
		if (newSelectedEvent) {
			setSelectedEvent(newSelectedEvent)
		}
	}

	const handleUpdate = async (newValue: number, typeValue: 'unit' | 'price') => {
		try {
			if (typeValue === 'unit' && newValue > pax) {
				throw Error('Cannot be greater than the total number of passengers.')
			}
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
					dayIndex = state.schedule.length - 1
					break
				default:
					dayIndex = undefined
					break
			}
			if (dayIndex === undefined) return
			dispatch({
				type: 'UPDATE_DINNER_RESTAURANT',
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
				text: error.message,
				icon: 'error',
				confirmButtonColor: 'green'
			})
		}
	}

	const NoDinner = items.length === 0
	if (NoDinner) return null

	return (
		<>
			<tr className={tableRowClasses}>
				<td className={tableCellClasses}>{date}</td>
				<td>{`Dinner Restaurants`}</td>
				<td>
					<OptionSelect
						options={items}
						value={selectedEvent.name || ""}
						handleChange={(e) => handleSelectChange(e)}
					/>
				</td>
				<td>
					<EditableCell
						value={selectedEvent?.participants ? selectedEvent.participants : pax}
						typeValue='unit'
						onSave={(newValue) => handleUpdate(newValue, "unit")}
					/>
				</td>
				<td>
					<EditableCell
						value={selectedEvent.price as number}
						typeValue='price'
						onSave={(newValue) => handleUpdate(newValue, "price")}
					/>
				</td>
				<td>
					{
						!selectedEvent.isVenue
							? accounting.formatMoney(
								Number(nrUnits * Number(selectedEvent?.price)),
								'€'
							)
							: accounting.formatMoney(getVenuesCost(selectedEvent), '€')
					}
				</td>
			</tr>
			{selectedEvent.isVenue && (
				<VenueBreakdownRows
					date={date}
					id="dinner"
					venue={selectedEvent}
					units={pax}
				/>
			)}
		</>
	)
}
