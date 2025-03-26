import { useState, useEffect } from 'react'
import { EditableCell } from '../meals_activities/EditableCell'
import { IRestaurant, IEntertainment } from '../../../../../interfaces'
import {
	getDayIndex,
	existRestaurant,
	existEntertaiment
} from '../../../helpers'
import accounting from 'accounting'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCurrentProject } from 'src/hooks'
import { UpdateRestaurantEntertainmentPayload } from 'src/redux/features/currentProject/types'

interface Props {
	title: string
	date: string
	selectedRestaurant: IRestaurant
	typeMeal: 'lunch' | 'dinner'
	entertaiment: IEntertainment
	setEntertainment: React.Dispatch<React.SetStateAction<IEntertainment>>
	keyEntertainmentPrice:
		| 'artistsFee'
		| 'aavv'
		| 'lighting'
		| 'travelAllowance'
		| 'mealAllowance'
		| 'other'
}

export const EntertainmentBreakdownRow = ({
	title,
	date,
	entertaiment,
	setEntertainment,
	selectedRestaurant,
	typeMeal,
	keyEntertainmentPrice
}: Props) => {
	const mySwal = withReactContent(Swal)

	const { currentProject, updateRestaurantEntertainment } = useCurrentProject()

	const [price, setPrice] = useState(
		entertaiment.price && entertaiment.price[keyEntertainmentPrice]
			? entertaiment.price[keyEntertainmentPrice]
			: 0
	)

	useEffect(() => {
		setPrice(
			entertaiment.price && entertaiment.price[keyEntertainmentPrice]
				? entertaiment.price[keyEntertainmentPrice]
				: 0
		)
	}, [entertaiment])

	const handleUpdate = async (newValue: number) => {
		try {
			const dayIndex = getDayIndex(date, currentProject.schedule.length)
			const isRestaurant = existRestaurant(
				dayIndex,
				currentProject,
				typeMeal,
				selectedRestaurant._id
			)
			if (!isRestaurant) {
				throw Error('restaurant not found')
			}
			const isEntertaiment = existEntertaiment(
				selectedRestaurant,
				entertaiment._id
			)
			if (!isEntertaiment) {
				throw Error('entertainment not found')
			}
			const updateValue = newValue > 0 ? newValue : 0
			const payload: UpdateRestaurantEntertainmentPayload = {
				value: updateValue,
				dayIndex,
				typeMeal,
				idRestaurant: selectedRestaurant._id,
				idEntertainment: entertaiment._id,
				keyEntertainmentPrice
			}
			updateRestaurantEntertainment(payload)
			const updateEntertaiment = JSON.parse(JSON.stringify(entertaiment))
			updateEntertaiment.price[keyEntertainmentPrice] = updateValue
			setEntertainment(updateEntertaiment)
			setPrice(updateValue)
		} catch (error: any) {
			await mySwal.fire({
				title: 'Error!',
				text: error.message,
				icon: 'error',
				confirmButtonColor: 'green'
			})
		}
	}

	const prices = Object.values(entertaiment.price || {})
	const totalCost = prices.reduce(
		(accumalator, currentValue) => accumalator + currentValue,
		0
	)

	// Styling for total row
	const isTotalRow = title === 'TOTAL COST'
	const totalRowClass = isTotalRow ? 'font-bold text-white-0' : 'text-gray-300'

	return (
		<tr className="border-b border-indigo-700/20 hover:bg-indigo-800/20 transition-colors duration-150 group">
			<td
				align="left"
				className={`py-3 px-6 ${
					isTotalRow
						? 'text-lg font-black text-white-0'
						: 'font-medium text-gray-300 group-hover:text-indigo-200'
				}`}
			>
				{title}
			</td>
			<td align="center"> </td>
			<td align="center"></td>
			<td align="center"></td>
			<td align="center" className="py-3 px-6">
				{keyEntertainmentPrice !== 'other' ? (
					<EditableCell
						value={price as number}
						typeValue="price"
						onSave={(newValue) => handleUpdate(newValue)}
					/>
				) : (
					<span className="text-lg font-bold text-white-0 group-hover:text-green-200 transition-colors duration-200">
						{accounting.formatMoney(totalCost, '€')}
					</span>
				)}
			</td>
		</tr>
	)
}
