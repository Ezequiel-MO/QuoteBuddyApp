import { useEffect, useState } from 'react'
import { HotelTotalCost } from '.'
import { OptionSelect } from '../../multipleOrSingle'
import { IHotel } from '../../../../../interfaces'
import { useContextBudget } from '../../../context/BudgetContext'
import {
	SET_SELECTED_HOTEL,
	SET_SELECTED_HOTEL_COST
} from '../../../context/budgetReducer'
import { useCurrentProject } from '../../../../../hooks'
import { ToggleTableRowIcon } from '@components/atoms/ToggleTableRowIcon'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'

interface HotelSummaryRowProps {
	hotels: IHotel[]
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const HotelSummaryRow = ({
	hotels,
	isOpen,
	setIsOpen
}: HotelSummaryRowProps) => {
	const { state, dispatch } = useContextBudget()
	const { currentProject } = useCurrentProject()
	const { multiDestination } = currentProject
	const hotelName = state.selectedHotel?.name

	const [hotelIndex, setHotelIndex] = useState<null | number>(null)

	useEffect(() => {
		if (state.selectedHotel) {
			dispatch({
				type: SET_SELECTED_HOTEL_COST,
				payload: {
					nights: state.schedule.length - 1,
					selectedHotel: state.selectedHotel
				}
			})
		}
	}, [state.selectedHotel, dispatch])

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedHotelName = e.target.value
		const selectedHotel = hotels.find(
			(hotel) => hotel.name === selectedHotelName
		)
		const selectedHotelIndex = hotels.findIndex(el => el.name === selectedHotelName)
		if (selectedHotel) {
			setHotelIndex(selectedHotelIndex)
			dispatch({
				type: SET_SELECTED_HOTEL,
				payload: {
					selectedHotel
				}
			})
		}
	}

	const toggleBreakdown = () => {
		setIsOpen((prevState: boolean) => !prevState)
	}

	useEffect(() => {
		dispatch({
			type: SET_SELECTED_HOTEL,
			payload: {
				selectedHotel: hotels[hotelIndex || 0]
			}
		})
	}, [hotels, dispatch])

	return (
		<tr className={tableRowClasses}>
			<ToggleTableRowIcon isOpen={isOpen} toggle={toggleBreakdown} />
			<td className={tableCellClasses}>
				{multiDestination ? 'Overnight @' : null}
			</td>
			<td>
				{hotels.length === 1 ? (
					`${hotelName}`
				) : (
					<OptionSelect
						options={hotels}
						value={hotelName || hotels[0].name}
						handleChange={handleChange}
					/>
				)}
			</td>
			<td></td>
			<td></td>
			<HotelTotalCost />
		</tr>
	)
}
