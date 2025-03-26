import { useState, useEffect } from 'react'
import accounting from 'accounting'
import { EditableCellVenue } from './EditableCellVenue'
import { getDayIndex, existRestaurant } from '../../../helpers'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCurrentProject } from 'src/hooks'
import { UpdateRestaurantVenuePayload } from 'src/redux/features/currentProject/types'

interface Props {
	date: string
	id: 'lunch' | 'dinner'
	restaurantId: string
	units: number
	title: string
	rate: number
	keyVenueUnit: 'cocktail_units' | 'catering_units' | 'staff_units' | 'unit'
	keyVenuePrice:
		| 'rental'
		| 'cocktail_price'
		| 'catering_price'
		| 'catering_price'
		| 'staff_menu_price'
		| 'audiovisuals'
		| 'cleaning'
		| 'security'
		| 'entertainment'
}

// Define a type excluding 'unit' to match UpdateRestaurantVenuePayload
type ValidVenueKey =
	| 'cocktail_units'
	| 'catering_units'
	| 'staff_units'
	| 'rental'
	| 'cocktail_price'
	| 'catering_price'
	| 'staff_menu_price'
	| 'audiovisuals'
	| 'cleaning'
	| 'security'
	| 'entertainment'

export const VenueBreakdownRow = ({
	date,
	id,
	restaurantId,
	units,
	title,
	rate,
	keyVenueUnit,
	keyVenuePrice
}: Props) => {
	if (units === 0 || rate === 0) return null

	const mySwal = withReactContent(Swal)
	const { currentProject, updateRestaurantVenue, addOrEditVenue, budget } =
		useCurrentProject()

	const [venue, setVenue] = useState({
		[keyVenueUnit]: units,
		[keyVenuePrice]: rate
	})

	useEffect(() => {
		if (venue[keyVenueUnit] !== units) {
			setVenue((prev) => ({
				...prev,
				[keyVenueUnit]: units
			}))
		}
		if (venue[keyVenuePrice] !== rate) {
			setVenue((prev) => ({
				...prev,
				[keyVenuePrice]: rate
			}))
		}
	}, [budget?.meals?.[date]?.[id]?.venue_price])

	const titles = [
		'cleaning',
		'audiovisual equipment',
		'full day rental rate',
		'security',
		'entertainment'
	]

	const handleUpdate = async (
		value: number,
		keyToUpdate: string,
		type: 'unit' | 'price'
	) => {
		try {
			if (!restaurantId) throw Error('restaurant not found')
			const dayIndex = getDayIndex(date, currentProject.schedule.length)
			const isRestaurant = existRestaurant(
				dayIndex,
				currentProject,
				id,
				restaurantId
			)
			if (!isRestaurant) {
				throw Error('restaurant not found')
			}

			// Update local state for all cases
			setVenue((prev) => ({
				...prev,
				[keyToUpdate]: type === 'unit' ? Math.round(value) : value
			}))

			// Only send to API if it's not 'unit' (which is a special case not supported by the API)
			if (keyToUpdate !== 'unit') {
				const payload: UpdateRestaurantVenuePayload = {
					value: type === 'unit' ? Math.round(value) : value,
					dayIndex,
					restaurantId,
					keyVenue: keyToUpdate as ValidVenueKey,
					typeMeal: id
				}
				updateRestaurantVenue(payload)
			}
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

	// Calculate total cost
	const totalCost = venue[keyVenueUnit] * venue[keyVenuePrice]

	// Determine if units should be editable
	const isUnitEditable = !titles.includes(title.toLowerCase())

	return (
		<tr className="border-b border-blue-700/20 hover:bg-blue-800/30 transition-colors duration-150 group">
			<th
				scope="row"
				className="py-3 px-6 text-left whitespace-nowrap flex items-center font-medium text-gray-300 group-hover:text-blue-200"
			>
				{title}
			</th>
			<td className="text-center">
				{isUnitEditable ? (
					<EditableCellVenue
						typeValue="unit"
						value={venue[keyVenueUnit]}
						onSave={(newValue) => handleUpdate(newValue, keyVenueUnit, 'unit')}
					/>
				) : (
					<span className="bg-orange-800/40 text-orange-100 font-semibold py-1 px-3 rounded-full text-sm">
						{venue[keyVenueUnit]}
					</span>
				)}
			</td>
			<td></td>
			<td className="text-center">
				<EditableCellVenue
					typeValue="price"
					value={venue[keyVenuePrice]}
					onSave={(newValue) => handleUpdate(newValue, keyVenuePrice, 'price')}
				/>
			</td>
			<td className="text-center py-3 px-6 text-white-0 group-hover:text-green-200 transition-colors duration-200">
				{accounting.formatMoney(totalCost, '€')}
			</td>
		</tr>
	)
}
