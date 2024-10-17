import React, { useState } from 'react'
import { useContextBudget } from '../../../context/BudgetContext'
import { useCurrentProject } from 'src/hooks'
import EditableCell from './EditableCell'
import { getKeyHotelPrice } from '../../../helpers'
import accounting from 'accounting'

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
	const { state, dispatch } = useContextBudget()
	const { currentProject } = useCurrentProject()

	const titlesNotEdit = ['Breakfast', 'City Tax']

	const [hotelPrice, setHotelPrice] = useState({
		units: units || 0,
		price: rate || 0
	})

	// Retrieve the latest room counts from state.selectedHotel and ensure they are numbers
	const DUInr = Number(state.selectedHotel?.price[0]['DUInr'] || 0)
	const DoubleRoomNr = Number(
		state.selectedHotel?.price[0]['DoubleRoomNr'] || 0
	)

	// Calculate unitsPerNight for "Breakfast" and "City Tax"
	const unitsPerNight = titlesNotEdit.includes(title)
		? DUInr + DoubleRoomNr * 2
		: hotelPrice.units

	// Calculate the total price using unitsPerNight
	const totalPrice = unitsPerNight * hotelPrice.price * nights

	const findOriginalHotel = currentProject.hotels.find(
		(el) => el._id === state.selectedHotel?._id
	)

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
		dispatch({
			type: 'UPDATE_HOTEL_PRICE',
			payload: {
				idHotel: state.selectedHotel._id,
				keyHotelPrice: fieldName,
				value: newValue
			}
		})
		setHotelPrice((prev) => ({
			...prev,
			[unitsOrPrice]: Number(newValue)
		}))
	}

	return (
		<tr className="border-b border-gray-200 hover:bg-gray-100 hover:text-[#000]">
			<td className="py-3 px-6 text-left whitespace-nowrap flex items-center font-medium">
				{title}
			</td>
			<td className="py-3 text-center w-40">
				{titlesNotEdit.includes(title) ? (
					unitsPerNight
				) : (
					<EditableCell
						value={hotelPrice.units}
						originalValue={
							Number(
								findOriginalHotel?.price[0][getKeyHotelPrice(title, 'units')]
							) || 0
						}
						typeValue="unit"
						onSave={(newValue) => handleSave(newValue, title, 'units')}
					/>
				)}
			</td>
			<td className="py-3 text-center">{nights}</td>
			<td className="py-3 text-center w-40">
				<EditableCell
					value={hotelPrice.price}
					originalValue={
						Number(
							findOriginalHotel?.price[0][getKeyHotelPrice(title, 'price')]
						) || 0
					}
					typeValue="price"
					onSave={(newValue) => handleSave(newValue, title, 'price')}
				/>
			</td>
			<td className="py-3 px-6 text-center">
				{accounting.formatMoney(totalPrice, '€')}
			</td>
		</tr>
	)
}
