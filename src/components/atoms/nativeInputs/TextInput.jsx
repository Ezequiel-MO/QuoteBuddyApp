export const TextInput = ({
	type = 'text',
	name,
	value,
	handleChange,
	handleBlur,
	errors = '',
	placeholder = '',
	styling = '',
	...props
}) => {
	const defaultStyling =
		'w-full px-3 py-2 text-base text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
	return (
		<div>
			<label
				htmlFor={name}
				className="uppercase text-xl text-gray-600 font-bold"
			>
				{name}
			</label>
			<input
				type={type}
				name={name}
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				placeholder={placeholder}
				className={`${styling ? styling : defaultStyling}`}
				{...props}
			/>
			{errors && <p className="mt-2 text-sm text-red-600">{errors}</p>}
		</div>
	)
}
