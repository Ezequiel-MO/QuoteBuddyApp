import React from 'react'
import EditableCell from './EditableCell'
import { IHotel } from 'src/interfaces/hotel'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCurrentProject } from 'src/hooks'
import { UpdateOvernightHotelPricePayload } from 'src/redux/features/currentProject/types'

type FieldName =
	| 'DUIprice'
	| 'DoubleRoomNr'
	| 'DoubleRoomPrice'
	| 'breakfast'
	| 'DailyTax'

interface OvernightHotelBreakdownRowProps {
	units: number
	rate: number
	nights: number
	title: string
	selectedHotel: IHotel
	setSelectedHotel: React.Dispatch<React.SetStateAction<IHotel>>
	date: string
}

export const OvernightHotelBreakdownRow: React.FC<
	OvernightHotelBreakdownRowProps
> = ({ units, rate, nights, title, selectedHotel, setSelectedHotel, date }) => {
	const mySwal = withReactContent(Swal)

	const {
		currentProject: { schedule = [] },
		updateOvernightHotelPrice
	} = useCurrentProject()

	const types = [
		{ name: 'Double Room Single Use', unit: 'DUInr', price: 'DUIprice' },
		{
			name: 'Double Room //Twin Room',
			unit: 'DoubleRoomNr',
			price: 'DoubleRoomPrice'
		},
		{ name: 'City Tax', unit: '', price: 'DailyTax' },
		{ name: 'Breakfast', unit: '', price: 'breakfast' }
	]

	const handleUpdate = async (
		newValue: number,
		title: string,
		typeValue: 'unit' | 'price'
	) => {
		try {
			if (!selectedHotel?._id) throw Error("Hotel not found'")
			let dayIndex: number | undefined
			let daySchedule = date.split(' ')
			switch (daySchedule[0]) {
				case 'Arrival':
					dayIndex = 0
					break
				case 'Day':
					dayIndex = parseInt(daySchedule[1]) - 1
					break
				case 'Departure':
					dayIndex = schedule.length - 1
					break
				default:
					dayIndex = undefined
					break
			}
			if (dayIndex === undefined) throw Error('day Error')
			let findType = types.find((el) => el.name === title)
			if (!findType) throw Error('Invalid field title')
			const fieldName = findType[typeValue] as FieldName
			const payload: UpdateOvernightHotelPricePayload = {
				dayIndex,
				id: selectedHotel._id,
				key: fieldName,
				value: newValue
			}
			updateOvernightHotelPrice(payload)
			const copyHotel: IHotel = JSON.parse(JSON.stringify(selectedHotel))
			copyHotel.price[0][fieldName] = newValue
			setSelectedHotel(copyHotel)
		} catch (error: any) {
			console.log(error)
			await mySwal.fire({
				title: 'Error!',
				text: error.message,
				icon: 'error',
				confirmButtonColor: 'green',
				allowEnterKey: false
			})
		}
	}

	return (
		<tr className="border-b border-gray-200 hover:bg-gray-100 hover:text-[#000]">
			<td className="py-3 px-6 text-left whitespace-nowrap flex items-center font-medium">
				{title}
			</td>
			<td className="py-3 px-6 text-center">
				{title !== 'City Tax' && title !== 'Breakfast' ? (
					<EditableCell
						value={units}
						onSave={(newValue) => handleUpdate(newValue, title, 'unit')}
					/>
				) : (
					units
				)}
			</td>
			<td className="py-3 px-6 text-center">{nights}</td>
			<td className="py-3 px-6 text-center">
				<EditableCell
					value={rate}
					onSave={(newValue) => handleUpdate(newValue, title, 'price')}
				/>
			</td>
			<td className="py-3 px-6 text-center">
				{`${(units * rate * nights).toFixed(2)} €`}
			</td>
		</tr>
	)
}
