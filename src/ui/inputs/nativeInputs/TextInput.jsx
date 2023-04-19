export const TextInput = ({
	name,
	value,
	handleChange,
	errors = '',
	placeholder = ''
}) => {
	return (
		<div className="mb-6">
			<label className="capitalize" htmlFor={name}>
				{name}
			</label>
			<input
				type="text"
				name={name}
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				className="w-full
                                px-2
                                py-1
                                text-base
                                text-gray-700
                                border border-solid border-gray-300
                                rounded-t-md
                                focus:text-gray-700 focus:outline-none"
			/>
			{errors && (
				<p className="py-1 text-center bg-red-500 font-bold text-white-100 rounded-b-md">
					{errors}
				</p>
			)}
		</div>
	)
}
