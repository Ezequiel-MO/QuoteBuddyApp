// SelectInput.tsx
import React, { ChangeEvent, FocusEvent, HTMLProps } from 'react'

interface Option {
	name: string
	value: string
}

interface SelectInputProps extends HTMLProps<HTMLSelectElement> {
	titleLabel: string
	placeholderOption: string
	name: string
	value: string
	options: Option[]
	handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
	disabled?: boolean
	errorKey?: string
	errors?: { [key: string]: string | undefined }
	handleBlur?: (e: FocusEvent<HTMLSelectElement>) => void
}

export const SelectInput: React.FC<SelectInputProps> = ({
	titleLabel,
	placeholderOption,
	name,
	value,
	options,
	handleChange,
	disabled = false,
	errorKey,
	errors = {},
	handleBlur,
	...props
}) => {
	const selectId = `${name}-select` // Create a unique ID for the select
	return (
		<div className="mb-4">
			<label
				htmlFor={selectId} // Correctly associate label with select
				className="uppercase text-xl text-gray-600 font-bold mr-2"
			>
				{titleLabel}
			</label>
			<select
				id={selectId} // Assign id to select
				name={name}
				value={value}
				onChange={handleChange}
				onBlur={handleBlur}
				disabled={disabled}
				className="bg-gray-700 text-gray-200 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
				{...props}
			>
				<option value="">{placeholderOption}</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.name}
					</option>
				))}
			</select>
			{errorKey && errors[errorKey] && (
				<p className="mt-2 text-sm text-red-600">{errors[errorKey]}</p>
			)}
		</div>
	)
}
