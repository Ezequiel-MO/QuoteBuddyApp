export const NumberInput = ({
	name,
	value,
	handleChange,
	handleBlur,
	errors = '',
	placeholder = ''
}) => {
	return (
		<div>
			<label
				className="uppercase text-xl text-gray-600 font-bold"
				htmlFor={name}
			>
				{name}
			</label>
			<input
				type="number"
				name={name}
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				placeholder={placeholder}
				className="bg-gray-700 text-white border rounded-md px-3 py-2 w-full focus:border-blue-500"
			/>
			{errors && <p className="mt-1 text-red-500">{errors}</p>}
		</div>
	)
}
