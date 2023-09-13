export type categoryType =
	| 'MOC'
	| 'Dance'
	| 'Music'
	| 'Magician'
	| 'DJ'
	| 'PhotoBooth'
	| 'Other'

interface Props {
	category: categoryType
	handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
	handleBlur: (event: React.FocusEvent<HTMLSelectElement>) => void
	errors: any
}

export const EntertainmentCategorySelector = ({
	category,
	handleChange,
	handleBlur,
	errors
}: Props) => {
	return (
		<div className="my-2">
			<label className="block uppercase text-lg text-gray-400 font-medium mb-2">
				Category
			</label>
			<select
				name="category"
				value={category}
				onChange={handleChange}
				onBlur={handleBlur}
				className="cursor-pointer w-full p-2 border rounded-md bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
			>
				<option value="none">-- Choose an option --</option>
				<option value="MOC">MOC</option>
				<option value="Dance">Dance</option>
				<option value="Music">Music</option>
				<option value="Magician">Magician</option>
				<option value="DJ">DJ</option>
				<option value="PhotoBooth">PhotoBooth</option>
				<option value="Other">Other</option>
			</select>
			{errors.category && (
				<p className="mt-1 text-red-500">{errors.category}</p>
			)}
		</div>
	)
}
