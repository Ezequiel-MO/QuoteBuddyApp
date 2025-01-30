// TableFormGroup.tsx
import { FC, ChangeEvent } from 'react'
import { IVenuePrice } from '../../../../../../../interfaces'

interface TableFormGroupProps {
	group: 'first' | 'second'
	value: IVenuePrice
	handleChangeForm: (e: ChangeEvent<HTMLInputElement>) => void
	isChecked: Record<keyof IVenuePrice, boolean>
}

const firstGroupFields: (keyof IVenuePrice)[] = [
	'rental',
	'cocktail_units',
	'cocktail_price',
	'catering_units',
	'catering_price',
	'security'
]

const secondGroupFields: (keyof IVenuePrice)[] = [
	'staff_units',
	'staff_menu_price',
	'audiovisuals',
	'cleaning',
	'entertainment'
]

export const TableFormGroup: FC<TableFormGroupProps> = ({
	group,
	value,
	handleChangeForm,
	isChecked
}) => {
	const fields = group === 'first' ? firstGroupFields : secondGroupFields
	const gridCols = group === 'first' ? 'grid-cols-6' : 'grid-cols-5'

	return (
		<div className={`grid ${gridCols} gap-2`}>
			{fields.map((field) => (
				<div key={field} className="border border-gray-700 p-2 bg-gray-800">
					<input
						className={`w-full bg-gray-700 text-gray-100 rounded px-2 py-1.5 text-sm 
							${isChecked[field] ? 'border-2 border-orange-500' : 'border border-gray-600'}
							focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all`}
						type="number"
						name={field}
						value={value[field] ?? ''}
						onChange={handleChangeForm}
						min="0"
						step="0.01"
						aria-label={field.replace(/_/g, ' ')}
						placeholder={field
							.split('_')
							.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
							.join(' ')}
					/>
				</div>
			))}
		</div>
	)
}
