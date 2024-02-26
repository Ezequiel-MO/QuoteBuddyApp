import { useEffect, useState } from 'react'
import { useContextBudget } from '../../../context/BudgetContext'
import { UPDATE_OVERNIGHT_COST } from '../../../context/budgetReducer'
import { OptionSelect } from '../../multipleOrSingle'
import accounting from 'accounting'
import { OvernightBreakdownRows } from './OvernightBreakdownRows'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { ToggleTableRowIcon } from '@components/atoms/ToggleTableRowIcon'
import { IHotel } from '@interfaces/hotel'

interface Props {
	date: string
	hotels: IHotel[]
}

export const OvernightRows = ({ date, hotels }: Props) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [selectedHotel, setSelectedHotel] = useState<IHotel>(hotels[0])
	const { state, dispatch } = useContextBudget()
	const hotelCost = state.overnight[date]?.hotelCost ?? 0

	useEffect(() => {
		if (date) {
			dispatch({
				type: UPDATE_OVERNIGHT_COST,
				payload: {
					date,
					hotel: selectedHotel
				}
			})
		}
	}, [date, dispatch, selectedHotel])

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedHotelName = e.target.value
		const foundHotel = hotels.find((hotel) => hotel.name === selectedHotelName)
		if (foundHotel) {
			setSelectedHotel(foundHotel)
		}
	}

	const toggleBreakdown = () => {
		setIsOpen((prevState: boolean) => !prevState)
	}
	return (
		<>
			<tr className={tableRowClasses}>
				<ToggleTableRowIcon isOpen={isOpen} toggle={toggleBreakdown} />
				<td className={tableCellClasses}>{'Overnight @'}</td>
				<td>
					{hotels.length === 1 ? (
						`${selectedHotel?.name}`
					) : (
						<OptionSelect
							options={hotels}
							value={selectedHotel?.name || hotels[0]?.name}
							handleChange={handleChange}
						/>
					)}
				</td>
				<td>{1}</td>
				<td></td>
				<td>{accounting.formatMoney(hotelCost, '€')}</td>
			</tr>
			<OvernightBreakdownRows selectedHotel={selectedHotel} isOpen={isOpen} />
		</>
	)
}
