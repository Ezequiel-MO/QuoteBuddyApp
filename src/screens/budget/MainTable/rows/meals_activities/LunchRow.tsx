import { useEffect, useState } from 'react'
import { OptionSelect } from '../../multipleOrSingle'
import { IEvent, IRestaurant } from '../../../../../interfaces'
import { UPDATE_PROGRAM_MEALS_COST } from '../../../context/budgetReducer'
import { useContextBudget } from '../../../context/BudgetContext'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCell } from './EditableCell'
import { VenueBreakdownRows } from '../venue'
import accounting from 'accounting'
import { getVenuesCost } from 'src/helper/budget/getVenuesCost'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getDayIndex, existRestaurant } from '../../../helpers'
import { useCurrentProject } from 'src/hooks'

interface LunchRowProps {
	items: IRestaurant[]
	date: string
	pax: number
	selectedEvent: IRestaurant
	setSelectedEvent: React.Dispatch<React.SetStateAction<IEvent | IRestaurant>>
}

export const LunchRow = ({
	items,
	date,
	pax,
	selectedEvent,
	setSelectedEvent
}: LunchRowProps) => {
	const mySwal = withReactContent(Swal)

	const NoLunch = items.length === 0
	if (NoLunch) return null

	const { dispatch, state } = useContextBudget()

	const { currentProject } = useCurrentProject()

	const [nrUnits, setNrUnits] = useState(selectedEvent?.participants || pax)
	useEffect(() => {
		setNrUnits(selectedEvent?.participants || pax)
	}, [selectedEvent])

	useEffect(() => {
		dispatch({
			type: UPDATE_PROGRAM_MEALS_COST,
			payload: {
				date,
				restaurant: selectedEvent ? selectedEvent : null,
				pax: selectedEvent?.participants || pax,
				type: 'lunch'
			}
		})
	}, [dispatch, NoLunch, date, selectedEvent])

	const dayIndex = getDayIndex(date, state)
	const originalRestaurant = currentProject?.schedule[
		dayIndex
	].lunch.restaurants.find((el) => el?._id === selectedEvent?._id)

	const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
		const newValue = e.target.value as string
		const newSelectedEvent =
			items && items.find((item) => item?.name === newValue)
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
			existRestaurant(dayIndex, state, 'lunch', selectedEvent._id)
			dispatch({
				type: 'UPDATE_LUNCH_RESTAURANT',
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
			await mySwal.fire({
				title: 'Error!',
				text: error.message,
				icon: 'error',
				confirmButtonColor: 'green'
			})
		}
	}

	const [venueCost, setVenueCost] = useState(getVenuesCost(selectedEvent))
	useEffect(() => {
		const restaurant = state.schedule[dayIndex]?.lunch?.restaurants?.find(
			(el) => el?._id === selectedEvent?._id
		)
		if (restaurant) {
			setVenueCost(getVenuesCost(restaurant))
		}
	}, [state])

	return (
		<>
			<tr className={tableRowClasses}>
				<td className={tableCellClasses}>{date}</td>
				<td>{`Lunch Restaurants`}</td>
				<td>
					<OptionSelect
						options={items}
						value={selectedEvent?.name || ''}
						handleChange={(e) => handleSelectChange(e)}
					/>
				</td>
				<td>
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
				<td>
					{!selectedEvent?.isVenue && (
						<EditableCell
							value={selectedEvent?.price as number}
							originalValue={originalRestaurant?.price || 0}
							typeValue="price"
							onSave={(newValue) => handleUpdate(newValue, 'price')}
						/>
					)}
				</td>
				<td>
					{!selectedEvent?.isVenue
						? accounting.formatMoney(
								Number(nrUnits * Number(selectedEvent?.price)),
								'€'
						  )
						: accounting.formatMoney(venueCost, '€')}
				</td>
			</tr>
			{selectedEvent?.isVenue && (
				<VenueBreakdownRows
					date={date}
					id="lunch"
					venue={selectedEvent}
					units={selectedEvent?.participants || pax}
				/>
			)}
		</>
	)
}
