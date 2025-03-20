import { useEffect, useState } from 'react'
import { OptionSelect } from '../../multipleOrSingle'
import { IEvent, IRestaurant } from '../../../../../interfaces'
import { VenueBreakdownRows } from '../venue'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCell } from './EditableCell'
import accounting from 'accounting'
import { getVenuesCost } from 'src/helper/budget/getVenuesCost'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getDayIndex } from '../../../helpers'
import { useCurrentProject } from 'src/hooks'
import {
	UpdateDinnerRestaurantPayload,
	UpdateProgramMealsCostPayload
} from 'src/redux/features/currentProject/types'

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

	const NoDinner = items.length === 0
	if (NoDinner) return null

	const {
		currentProject,
		updateBudgetProgramMealsCost,
		updateDinnerRestaurant
	} = useCurrentProject()

	const [nrUnits, setNrUnits] = useState(selectedEvent?.participants || pax)
	useEffect(() => {
		setNrUnits(selectedEvent?.participants || pax)
	}, [selectedEvent])

	useEffect(() => {
		const payload: UpdateProgramMealsCostPayload = {
			date,
			restaurant: selectedEvent ? selectedEvent : null,
			pax: selectedEvent?.participants || pax,
			type: 'dinner'
		}
		updateBudgetProgramMealsCost(payload)
	}, [NoDinner, date, selectedEvent])

	const dayIndex = getDayIndex(date, currentProject.schedule.length)
	const originalRestaurant = currentProject?.schedule[
		dayIndex
	].dinner?.restaurants?.find((el) => el._id === selectedEvent?._id)

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
					dayIndex = currentProject.schedule.length - 1
					break
				default:
					dayIndex = undefined
					break
			}
			if (dayIndex === undefined) return
			const payload: UpdateDinnerRestaurantPayload = {
				value: newValue ? newValue : 1,
				dayIndex,
				id: selectedEvent._id,
				key: typeValue === 'unit' ? 'participants' : 'price'
			}
			updateDinnerRestaurant(payload)
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
		<>
			<tr
				className={`${tableRowClasses} hover:bg-gray-700/20 transition-colors duration-150`}
			>
				<td className={tableCellClasses}></td>
				<td
					className={`${tableCellClasses} min-w-[200px] text-gray-100`}
				>{`Dinner Restaurants`}</td>
				<td className={tableCellClasses}>
					<OptionSelect
						options={items}
						value={selectedEvent?.name || ''}
						handleChange={(e) => handleSelectChange(e)}
					/>
				</td>
				<td className={tableCellClasses}>
					{!selectedEvent?.isVenue && (
						<EditableCell
							value={
								selectedEvent?.participants ? selectedEvent?.participants : pax
							}
							originalValue={originalRestaurant?.participants || pax}
							typeValue="unit"
							onSave={(newValue) => handleUpdate(newValue, 'unit')}
						/>
					)}
				</td>
				<td className={tableCellClasses}>
					{!selectedEvent?.isVenue && (
						<EditableCell
							value={selectedEvent?.price as number}
							originalValue={originalRestaurant?.price || 0}
							typeValue="price"
							onSave={(newValue) => handleUpdate(newValue, 'price')}
						/>
					)}
				</td>
				<td
					className={`${tableCellClasses} text-gray-100 px-2 py-1 min-w-[80px]`}
				>
					{!selectedEvent?.isVenue
						? accounting.formatMoney(
								Number(nrUnits * Number(selectedEvent?.price)),
								'€'
						  )
						: accounting.formatMoney(getVenuesCost(selectedEvent), '€')}
				</td>
			</tr>
			{selectedEvent?.isVenue && (
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
