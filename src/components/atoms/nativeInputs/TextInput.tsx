import React, { ChangeEvent, FocusEvent, HTMLProps } from 'react'

interface TextInputProps extends HTMLProps<HTMLInputElement> {
	type?: string
	name: string
	value: string
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void
	handleBlur?: (e: FocusEvent<HTMLInputElement>) => void
	errors?: string
	placeholder?: string
	styling?: string
	label?: string
}

export const TextInput: React.FC<TextInputProps> = ({
	type = 'text',
	name,
	value,
	handleChange,
	handleBlur,
	errors = '',
	placeholder = '',
	styling = '',
	label = '',
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
				{label || name}
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
