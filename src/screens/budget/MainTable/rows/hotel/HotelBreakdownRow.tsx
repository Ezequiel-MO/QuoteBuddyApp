import React, { useState, useMemo } from 'react'
import { useCurrentProject } from 'src/hooks'
import EditableCell from './EditableCell'
import { getKeyHotelPrice } from '../../../helpers'
import accounting from 'accounting'
import { IHotelPrice } from '@interfaces/hotel'

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
	const {
		currentProject,
		budget: { selectedHotel },
		updateHotelPrice
	} = useCurrentProject()

	const titlesNotEditable = ['Breakfast', 'City Tax']

	const [hotelPrice, setHotelPrice] = useState({
		units: units || 0,
		price: rate || 0
	})

	const selectedHotelPrice = selectedHotel?.price[0]
	const findOriginalHotel = useMemo(
		() =>
			currentProject.hotels.find((hotel) => hotel._id === selectedHotel?._id),
		[currentProject.hotels, selectedHotel?._id]
	)

	const DUInr = Number(selectedHotelPrice?.DUInr || 0)
	const DoubleRoomNr = Number(selectedHotelPrice?.DoubleRoomNr || 0)

	const unitsPerNight = titlesNotEditable.includes(title)
		? DUInr + DoubleRoomNr * 2
		: hotelPrice.units

	const totalPrice = unitsPerNight * hotelPrice.price * nights

	const handleSave = (
		newValue: number,
		fieldTitle: string,
		unitsOrPrice: 'units' | 'price'
	) => {
		if (!selectedHotel?._id) return

		const fieldNameMap: Record<
			string,
			{ units: keyof IHotelPrice; price: keyof IHotelPrice }
		> = {
			'Double Room Single Use': { units: 'DUInr', price: 'DUIprice' },
			'Double Room // Twin Room': {
				units: 'DoubleRoomNr',
				price: 'DoubleRoomPrice'
			}
		}

		const fieldName: keyof IHotelPrice | undefined =
			fieldTitle in fieldNameMap
				? fieldNameMap[fieldTitle][unitsOrPrice]
				: fieldTitle === 'Breakfast'
				? 'breakfast'
				: fieldTitle === 'City Tax'
				? 'DailyTax'
				: (undefined as keyof IHotelPrice | undefined)

		if (!fieldName) {
			console.error('Invalid field title:', fieldTitle)
			return
		}

		updateHotelPrice({
			idHotel: selectedHotel._id,
			keyHotelPrice: fieldName,
			value: newValue
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
				{titlesNotEditable.includes(title) ? (
					unitsPerNight
				) : (
					<EditableCell
						value={hotelPrice.units}
						originalValue={Number(
							findOriginalHotel?.price[0][getKeyHotelPrice(title, 'units')] || 0
						)}
						typeValue="unit"
						onSave={(newValue) => handleSave(newValue, title, 'units')}
					/>
				)}
			</td>
			<td className="py-3 text-center">{nights}</td>
			<td className="py-3 text-center w-40">
				<EditableCell
					value={hotelPrice.price}
					originalValue={Number(
						findOriginalHotel?.price[0][getKeyHotelPrice(title, 'price')] || 0
					)}
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
