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
		<>
			<label className="uppercase text-xl text-gray-600 font-bold">
				Category
			</label>
			<select
				name="category"
				value={category}
				onChange={handleChange}
				onBlur={handleBlur}
				className="your-classname-here"
			>
				<option value="MOC">MOC</option>
				<option value="Dance">Dance</option>
				<option value="Music">Music</option>
				<option value="Magician">Magician</option>
				<option value="DJ">DJ</option>
				<option value="PhotoBooth">PhotoBooth</option>
				<option value="Other">Other</option>
			</select>
			{errors.category && (
				<p /* className={styles.validationError} */>{errors.category}</p>
			)}
		</>
	)
}
