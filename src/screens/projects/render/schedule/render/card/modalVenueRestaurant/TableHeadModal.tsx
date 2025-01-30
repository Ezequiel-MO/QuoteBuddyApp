// TableHeadModal.tsx
import { FC } from 'react'
import { IVenuePrice, IRestaurant } from '../../../../../../../interfaces'
import { TableFormGroup } from './TableForm'

interface TableHeadModalProps {
	value: IVenuePrice
	setValue: React.Dispatch<React.SetStateAction<IVenuePrice>>
	isChecked: Record<keyof IVenuePrice, boolean>
	setIsChecked: React.Dispatch<
		React.SetStateAction<Record<keyof IVenuePrice, boolean>>
	>
	restaurant: IRestaurant
}

export const TableHeadModal: FC<TableHeadModalProps> = ({
	value,
	setValue,
	isChecked,
	setIsChecked,
	restaurant
}) => {
	const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value: inputValue } = e.target
		const numericValue = parseFloat(inputValue) || 0
		const venueKey = name as keyof IVenuePrice

		setValue((prev) => ({
			...prev,
			[venueKey]: numericValue
		}))

		const originalValue = restaurant.venue_price?.[venueKey] || 0
		setIsChecked((prev) => ({
			...prev,
			[venueKey]: numericValue !== originalValue
		}))
	}

	return (
		<div className="p-4 overflow-auto max-h-[500px] border border-gray-700 rounded-lg text-orange-200">
			{/* First Group: Headers */}
			<div className="grid grid-cols-6 gap-2 mb-2">
				{[
					'Rental Fee',
					'Cocktail (units)',
					'Cocktail (price)',
					'Catering (units)',
					'Catering (price)',
					'Security'
				].map((header) => (
					<div
						key={header}
						className="border border-gray-600 p-2 bg-gray-800 font-medium text-center"
					>
						{header}
					</div>
				))}
			</div>

			{/* First Group: Inputs */}
			<TableFormGroup
				group="first"
				value={value}
				handleChangeForm={handleChangeForm}
				isChecked={isChecked}
			/>

			{/* Second Group: Headers */}
			<div className="grid grid-cols-5 gap-2 mb-2 mt-6">
				{[
					'Staff (units)',
					'Staff Menu Price',
					'Audiovisuals',
					'Cleaning',
					'Entertainment'
				].map((header) => (
					<div
						key={header}
						className="border border-gray-600 p-2 bg-gray-800 font-medium text-center"
					>
						{header}
					</div>
				))}
			</div>

			{/* Second Group: Inputs */}
			<TableFormGroup
				group="second"
				value={value}
				handleChangeForm={handleChangeForm}
				isChecked={isChecked}
			/>
		</div>
	)
}
