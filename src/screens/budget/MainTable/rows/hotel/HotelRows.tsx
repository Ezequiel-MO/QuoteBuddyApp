import { useEffect, useState } from 'react'
import { HotelSummaryRow, HotelBreakdownRows } from '.'
import { IHotel } from '../../../../../interfaces'
import { useContextBudget } from '../../../context/BudgetContext'
import { SET_SELECTED_HOTEL } from '../../../context/budgetReducer'

interface Props {
	hotels?: IHotel[]
}

export const HotelRows = ({ hotels }: Props) => {
	if (!hotels || hotels.length === 0) {
		return null
	}

	const { dispatch } = useContextBudget()

	useEffect(() => {
		dispatch({
			type: SET_SELECTED_HOTEL,
			payload: {
				selectedHotel: hotels[0]
			}
		})
	}, [hotels, dispatch])

	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<>
			<HotelSummaryRow hotels={hotels} isOpen={isOpen} setIsOpen={setIsOpen} />
			<HotelBreakdownRows isOpen={isOpen} />
		</>
	)
}
