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
		'w-full px-2 py-1 text-base text-gray-700 border border-solid border-gray-300 rounded-t-md focus:text-gray-700 focus:outline-none'
	return (
		<div>
			<label
				htmlFor={name}
				className="uppercase text-gray-600 block text-xl font-bold"
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
			{errors && (
				<p className="py-1 text-center bg-red-500 font-bold text-white-100 rounded-b-md">
					{errors}
				</p>
			)}
		</div>
	)
}
