import React, { useState, useEffect } from 'react'
import accounting from 'accounting'
import { useCurrentProject } from 'src/hooks'
import { getKeyHotelPrice } from '../../../helpers'
import { useGetProject } from 'src/hooks/useGetProject'
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
	const {
		currentProject,
		budget: { selectedHotel },
		updateHotelPrice
	} = useCurrentProject()

	// Return null if selectedHotel is undefined
	if (!selectedHotel) {
		return null
	}

	const titlesNotEditable = ['Breakfast', 'City Tax']
	const totalPrice = units * rate * nights

	const { project } = useGetProject(currentProject.code)

	// Find original hotel for comparison
	const findOriginalHotel =
		project?.[0]?.hotels.find((hotel) => hotel._id === selectedHotel._id) ||
		currentProject.hotels.find((hotel) => hotel._id === selectedHotel._id)

	const handleSave = (
		newValue: number,
		fieldTitle: string,
		unitsOrPrice: 'units' | 'price'
	) => {
		if (!selectedHotel._id) return

		const fieldName = getKeyHotelPrice(fieldTitle, unitsOrPrice)
		if (!fieldName) {
			console.error('Invalid field title:', fieldTitle)
			return
		}

		updateHotelPrice({
			idHotel: selectedHotel._id,
			keyHotelPrice: fieldName,
			value: newValue
		})
	}

	return (
		<tr className="breakdown-row hover:bg-blue-800/30 transition-colors duration-200 group">
			<td className="py-4 px-6 text-left whitespace-nowrap font-medium group-hover:text-blue-200">
				{title}
			</td>
			<td className="py-4 text-center">
				{titlesNotEditable.includes(title) ? (
					<span className="text-gray-300">{units}</span>
				) : (
					<EditableCell
						value={units}
						onSave={(newValue: number) => handleSave(newValue, title, 'units')}
						typeValue="unit"
						originalValue={
							findOriginalHotel
								? Number(
										findOriginalHotel.price[0][
											getKeyHotelPrice(title, 'units')
										] || 0
								  )
								: undefined
						}
					/>
				)}
			</td>
			<td className="py-4 text-center">
				<span className="text-gray-300 group-hover:text-gray-200">
					{nights}
				</span>
			</td>
			<td className="py-4 text-center">
				<EditableCell
					value={rate}
					onSave={(newValue: number) => handleSave(newValue, title, 'price')}
					typeValue="price"
					originalValue={
						findOriginalHotel
							? Number(
									findOriginalHotel.price[0][
										getKeyHotelPrice(title, 'price')
									] || 0
							  )
							: undefined
					}
				/>
			</td>
			<td className="py-4 px-6 text-center font-medium text-white-0 group-hover:text-green-200 transition-colors duration-200">
				{accounting.formatMoney(totalPrice, '€')}
			</td>
		</tr>
	)
}
