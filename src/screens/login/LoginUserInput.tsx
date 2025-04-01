import React, { ChangeEvent, FocusEvent } from 'react'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string
	value: string | number
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void
	handleBlur?: (e: FocusEvent<HTMLInputElement>) => void
	errors?: string
	label?: string
	styling?: string
	disabled?: boolean
}

export const LoginUserInput: React.FC<TextInputProps> = ({
	type = 'text',
	name,
	value,
	handleChange,
	handleBlur,
	errors = '',
	placeholder = '',
	label = '',
	styling = '',
	disabled = false,
	...props
}) => {
	const defaultStyling =
		'w-full px-4 py-3 bg-gray-200 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 focus:border-transparent transition duration-200 cursor-text hover:border-blue-400 disabled:opacity-70 disabled:cursor-not-allowed'

	return (
		<div className="mb-4">
			{label && (
				<label
					htmlFor={name}
					className="block mb-2 text-sm font-medium text-gray-700"
				>
					{label || name}
				</label>
			)}
			<input
				id={name}
				type={type}
				name={name}
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				disabled={disabled}
				placeholder={placeholder}
				className={styling || defaultStyling}
				{...props}
			/>
			{errors && <p className="mt-1 text-sm text-red-400">{errors}</p>}
		</div>
	)
}
