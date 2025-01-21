// TextInput.tsx
import React, { ChangeEvent, FocusEvent, HTMLProps } from 'react'

interface TextInputProps extends HTMLProps<HTMLInputElement> {
	type?: string
	name: string
	value: any
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void
	handleBlur?: (e: FocusEvent<HTMLInputElement>) => void
	errors?: string
	placeholder?: string
	styling?: string
	label?: string
	checked?: boolean // Add checked prop for checkbox
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

	checked = false, // Default value for checked
	...props
}) => {
	const defaultStyling =
		'bg-gray-700 text-gray-200 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none'
	const checkboxStyling = 'form-checkbox h-5 w-5 text-blue-600'
	return (
		<div className="mb-4">
			<label
				htmlFor={name} // Correctly associate label with input
				className="uppercase text-xl text-gray-600 font-bold mr-2"
			>
				{label || name}
			</label>
			<input
				id={name} // Assign id to input
				type={type}
				name={name}
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				placeholder={placeholder}
				className={
					type === 'checkbox'
						? checkboxStyling
						: `${styling ? styling : defaultStyling}`
				}
				checked={type === 'checkbox' ? checked : undefined} // Handle checked prop for checkbox
				{...props}
			/>
			{errors && <p className="mt-2 text-sm text-red-600">{errors}</p>}
		</div>
	)
}
