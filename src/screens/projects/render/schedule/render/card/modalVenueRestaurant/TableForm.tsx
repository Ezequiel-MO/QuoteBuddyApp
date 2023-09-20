import { FC, ChangeEvent, useEffect } from 'react'
import { IVenuePrice, IRestaurant } from '../../../../../../../interfaces'

interface TableFormProps {
	value: IVenuePrice
	setValue: React.Dispatch<React.SetStateAction<IVenuePrice>>
	isChecked: object
	setIsChecked: React.Dispatch<React.SetStateAction<object>>
	restaurant: IRestaurant
}

type VenueKey =
	| 'rental'
	| 'cocktail_units'
	| 'cocktail_price'
	| 'catering_units'
	| 'catering_price'
	| 'staff_units'
	| 'staff_menu_price'
	| 'audiovisuals'
	| 'security'
	| 'entertainment'

export const TableForm: FC<TableFormProps> = ({
	value,
	setValue,
	isChecked,
	setIsChecked,
	restaurant
}) => {
	useEffect(() => {
		setIsChecked({
			...isChecked,
			rental: false,
			cocktail_units: false,
			cocktail_price: false,
			catering_units: false,
			catering_price: false,
			staff_units: false,
			staff_menu_price: false,
			audiovisuals: false,
			cleaning: false,
			security: false,
			entertainment: false
		})
	}, [restaurant])

	const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		const venuePrice: IVenuePrice = restaurant.venue_price ?? {}
		const venueKey: VenueKey = name as VenueKey
		setValue((prevValues) => ({
			...prevValues,
			[name]: parseFloat(value)
		}))
		if (parseFloat(value) < 0) {
			setValue((prevValues) => ({
				...prevValues,
				[name]: 0
			}))
		}
		if (venuePrice[venueKey] != parseFloat(value)) {
			setIsChecked({
				...isChecked,
				[name]: true
			})
		} else {
			setIsChecked({
				...isChecked,
				[name]: false
			})
		}
	}

	return (
		<tbody>
			<tr>
				<td className="border px-2 py-1">
					<input
						className="form-input mt-1 block w-full"
						type="number"
						name="rental"
						value={value?.rental}
						onChange={(e) => handleChangeForm(e)}
					/>
				</td>
				<td className="border px-2 py-1">
					<input
						className="form-input mt-1 block w-full"
						type="number"
						name="cocktail_units"
						value={value?.cocktail_units}
						onChange={(e) => handleChangeForm(e)}
					/>
				</td>
				<td className="border px-2 py-1">
					<input
						className="form-input mt-1 block w-full"
						type="number"
						name="cocktail_price"
						value={value?.cocktail_price}
						onChange={(e) => handleChangeForm(e)}
					/>
				</td>
				<td className="border px-2 py-1">
					<input
						className="form-input mt-1 block w-full"
						type="number"
						name="catering_units"
						value={value?.catering_units}
						onChange={(e) => handleChangeForm(e)}
					/>
				</td>
				<td className="border px-2 py-1">
					<input
						className="form-input mt-1 block w-full"
						type="number"
						name="catering_price"
						value={value?.catering_price}
						onChange={(e) => handleChangeForm(e)}
					/>
				</td>
				<td className="border px-2 py-1">
					<input
						className="form-input mt-1 block w-full"
						type="number"
						name="staff_units"
						value={value?.staff_units}
						onChange={(e) => handleChangeForm(e)}
					/>
				</td>
				<td className="border px-2 py-1">
					<input
						className="form-input mt-1 block w-full"
						type="number"
						name="staff_menu_price"
						value={value?.staff_menu_price}
						onChange={(e) => handleChangeForm(e)}
					/>
				</td>
				<td className="border px-2 py-1">
					<input
						className="form-input mt-1 block w-full"
						type="number"
						name="audiovisuals"
						value={value?.audiovisuals}
						onChange={(e) => handleChangeForm(e)}
					/>
				</td>
				<td className="border px-2 py-1">
					<input
						className="form-input mt-1 block w-full"
						type="number"
						name="cleaning"
						value={value?.cleaning}
						onChange={(e) => handleChangeForm(e)}
					/>
				</td>
				<td className="border px-2 py-1">
					<input
						className="form-input mt-1 block w-full"
						type="number"
						name="security"
						value={value?.security}
						onChange={(e) => handleChangeForm(e)}
					/>
				</td>
				<td className="border px-2 py-1">
					<input
						className="form-input mt-1 block w-full"
						type="number"
						name="entertainment"
						value={value?.entertainment}
						onChange={(e) => handleChangeForm(e)}
					/>
				</td>
			</tr>
		</tbody>
	)
}
