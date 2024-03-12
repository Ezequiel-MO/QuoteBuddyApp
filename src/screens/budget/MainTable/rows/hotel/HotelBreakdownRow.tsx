import React from 'react'
import { useContextBudget } from '../../../context/BudgetContext'
import { useCurrentProject } from 'src/hooks'
import EditableCell from './EditableCell'

interface HotelBreakdownRowProps {
	units: number
	rate: number
	nights: number
	title: string
}

export const HotelBreakdownRow: React.FC<HotelBreakdownRowProps> = ({
	units,
	rate,
	nights,
	title
}) => {
	const { state } = useContextBudget()
	const { editHotelPrice } = useCurrentProject()

	const handleSave = (
		newValue: number,
		fieldTitle: string,
		unitsOrPrice: 'units' | 'price'
	) => {
		if (!state.selectedHotel?._id) return
		let fieldName:
			| 'DUInr'
			| 'DUIprice'
			| 'DoubleRoomNr'
			| 'DoubleRoomPrice'
			| 'breakfast'
			| 'DailyTax'

		switch (fieldTitle) {
			case 'Double Room Single Use':
				if (unitsOrPrice === 'units') {
					fieldName = 'DUInr'
				} else {
					fieldName = 'DUIprice'
				}
				break
			case 'Double Room //Twin Room':
				if (unitsOrPrice === 'units') {
					fieldName = 'DoubleRoomNr'
				} else {
					fieldName = 'DoubleRoomPrice'
				}
				break
			case 'City Tax':
				fieldName = 'DailyTax'
				break
			case 'Breakfast':
				fieldName = 'breakfast'
				break
			default:
				console.error('Invalid field title')
				return
		}
		if(state.selectedHotel.price[0][fieldName] === newValue) return
		editHotelPrice({
			hotelId: state.selectedHotel._id,
			[fieldName]: newValue
		})
	}

	return (
		<tr className="border-b border-gray-200 hover:bg-gray-100 hover:text-[#000]">
			<td className="py-3 px-6 text-left whitespace-nowrap flex items-center font-medium">
				{title}
			</td>
			<td className="py-3 px-6 text-center">
				<EditableCell
					value={units}
					onSave={(newValue) => handleSave(newValue, title, 'units')}
				/>
			</td>
			<td className="py-3 px-6 text-center">{nights}</td>
			<td className="py-3 px-6 text-center">
				<EditableCell
					value={rate}
					onSave={(newValue) => handleSave(newValue, title, 'price')}
				/>
			</td>
			<td className="py-3 px-6 text-center">
				{`${(units * rate * nights).toFixed(2)} €`}
			</td>
		</tr>
	)
}
