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
		'bg-gray-700 text-white border rounded-md px-3 py-2 w-full focus:border-blue-500'
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
