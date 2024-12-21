import React, { useState, useMemo ,useEffect } from 'react'
import { useCurrentProject } from 'src/hooks'
import EditableCell from './EditableCell'
import { getKeyHotelPrice } from '../../../helpers'
import accounting from 'accounting'
import { IHotel, IHotelPrice } from '@interfaces/hotel'
import { useGetProject } from 'src/hooks/useGetProject'

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
	const { project } = useGetProject(currentProject.code)
	const [findOriginalHotel, setFindOriginalHotel] = useState<IHotel>()
	useEffect(()=>{
		if(Array.isArray(project) && project[0] && Array.isArray(project[0].hotels)){
			const findHotel = project[0]?.hotels?.find((hotel) => hotel._id === selectedHotel?._id)
			setFindOriginalHotel(findHotel)
		}
	},[selectedHotel , project])

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
		if (!selectedHotel?._id) return null

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
		<tr className={`border-b border-gray-200 hover:bg-gray-100 hover:text-[#000] transition-all duration-150 ${!findOriginalHotel && 'opacity-0'}`}>
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
