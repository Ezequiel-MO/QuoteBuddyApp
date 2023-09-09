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
