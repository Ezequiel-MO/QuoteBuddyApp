// HotelBreakdownRow.tsx

import React, { useState, useEffect, useMemo, FC } from 'react'
import { useCurrentProject } from 'src/hooks'
import { getKeyHotelPrice } from '../../../helpers'
import accounting from 'accounting'
import { IHotelPrice } from '@interfaces/hotel'
import { useGetProject } from 'src/hooks/useGetProject'
import EditableCell from './EditableCell'

interface HotelBreakdownRowProps {
	units: number
	rate: number
	nights: number
	title: string
}

export const HotelBreakdownRow: FC<HotelBreakdownRowProps> = ({
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

	// **Conditional Rendering:** Return null if selectedHotel is undefined
	if (!selectedHotel) {
		return null
	}

	const titlesNotEditable = useMemo(() => ['Breakfast', 'City Tax'], [])

	const [hotelPrice, setHotelPrice] = useState<{
		units: number
		price: number
	}>({
		units: units || 0,
		price: rate || 0
	})

	const selectedHotelPrice = selectedHotel.price[0]

	const { project } = useGetProject(currentProject.code)

	// **Find Original Hotel:** Memoize to prevent unnecessary computations
	const findOriginalHotel = useMemo(() => {
		if (
			Array.isArray(project) &&
			project.length > 0 &&
			project[0].hotels.length > 0
		) {
			return project[0].hotels.find((hotel) => hotel._id === selectedHotel._id)
		}
		return currentProject.hotels.find(
			(hotel) => hotel._id === selectedHotel._id
		)
	}, [project, currentProject.hotels, selectedHotel._id])

	// **Derived Values:** Use useMemo for performance optimization
	const DUInr = useMemo(
		() => Number(selectedHotelPrice.DUInr || 0),
		[selectedHotelPrice]
	)
	const DoubleRoomNr = useMemo(
		() => Number(selectedHotelPrice.DoubleRoomNr || 0),
		[selectedHotelPrice]
	)

	const unitsPerNight = useMemo(() => {
		return titlesNotEditable.includes(title)
			? DUInr + DoubleRoomNr * 2
			: hotelPrice.units
	}, [titlesNotEditable, title, DUInr, DoubleRoomNr, hotelPrice.units])

	const totalPrice = useMemo(
		() => unitsPerNight * hotelPrice.price * nights,
		[unitsPerNight, hotelPrice.price, nights]
	)

	const handleSave = (
		newValue: number,
		fieldTitle: string,
		unitsOrPrice: 'units' | 'price'
	) => {
		if (!selectedHotel._id) return

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

		let fieldName: keyof IHotelPrice | undefined

		if (fieldTitle in fieldNameMap) {
			fieldName = fieldNameMap[fieldTitle][unitsOrPrice]
		} else {
			switch (fieldTitle) {
				case 'Breakfast':
					fieldName = 'breakfast'
					break
				case 'City Tax':
					fieldName = 'DailyTax'
					break
				default:
					console.error('Invalid field title:', fieldTitle)
					return
			}
		}

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
			[unitsOrPrice]: newValue
		}))
	}

	return (
		<tr
			data-testid="HotelBreakdownRow"
			className={`border-b border-gray-200 hover:bg-gray-100 hover:text-[#000] transition-all duration-150 ${
				!findOriginalHotel ? 'opacity-0' : ''
			}`}
		>
			<td className="py-3 px-6 text-left whitespace-nowrap flex items-center font-medium">
				{title}
			</td>
			<td className="py-3 text-center w-40">
				{titlesNotEditable.includes(title) ? (
					unitsPerNight
				) : (
					<EditableCell
						value={hotelPrice.units}
						originalValue={
							findOriginalHotel
								? Number(
										findOriginalHotel.price[0][
											getKeyHotelPrice(title, 'units')
										] || 0
								  )
								: 0
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
						findOriginalHotel
							? Number(
									findOriginalHotel.price[0][
										getKeyHotelPrice(title, 'price')
									] || 0
							  )
							: 0
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
