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

	// Use your current hook to access actions
	const {
		currentProject,
		updateRestaurantEntertainment,
		updateBudgetProgramShowCost
	} = useCurrentProject()

	// State for the price value
	const [price, setPrice] = useState(
		entertaiment.price && entertaiment.price[keyEntertainmentPrice]
			? entertaiment.price[keyEntertainmentPrice]
			: 0
	)

	// Update price when entertainment changes
	useEffect(() => {
		setPrice(
			entertaiment.price && entertaiment.price[keyEntertainmentPrice]
				? entertaiment.price[keyEntertainmentPrice]
				: 0
		)
	}, [entertaiment, keyEntertainmentPrice])

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

			// Ensure non-negative value
			const updateValue = newValue > 0 ? newValue : 0

			// Prepare payload for Redux update
			const payload: UpdateRestaurantEntertainmentPayload = {
				value: updateValue,
				dayIndex,
				typeMeal,
				idRestaurant: selectedRestaurant._id,
				idEntertainment: entertaiment._id,
				keyEntertainmentPrice
			}

			// 1. Update the entertainment price in the project state
			updateRestaurantEntertainment(payload)

			// 2. Update local component state for immediate UI feedback
			const updatedEntertainment = JSON.parse(JSON.stringify(entertaiment))
			if (!updatedEntertainment.price) {
				updatedEntertainment.price = {}
			}
			updatedEntertainment.price[keyEntertainmentPrice] = updateValue
			setEntertainment(updatedEntertainment)
			setPrice(updateValue)

			// 3. Update the budget state with the updated entertainment
			// No need to pass totalCost - your thunk calculates it
			updateBudgetProgramShowCost({
				date,
				show: updatedEntertainment,
				type: typeMeal
			})
		} catch (error: any) {
			console.error('Error updating entertainment price:', error)
			await mySwal.fire({
				title: 'Error!',
				text: error.message,
				icon: 'error',
				confirmButtonColor: 'green'
			})
		}
	}

	// Calculate total only for the "TOTAL COST" row
	const calculateTotal = () => {
		if (keyEntertainmentPrice !== 'other') {
			return price
		}

		// Calculate total from all price fields
		if (!entertaiment.price) return 0

		return Object.values(entertaiment.price).reduce(
			(acc, val) => acc + (Number(val) || 0),
			0
		)
	}

	// Determine if this is the total row
	const isTotalRow = title === 'TOTAL COST'

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
						{accounting.formatMoney(calculateTotal(), '€')}
					</span>
				)}
			</td>
		</tr>
	)
}
