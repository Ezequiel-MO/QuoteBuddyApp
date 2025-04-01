import React, { ChangeEvent, FocusEvent, useState } from 'react'
import { Icon } from '@iconify/react'

interface PasswordInputProps {
	label?: string
	placeholder?: string
	value: string
	name: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	onBlur?: (e: FocusEvent<HTMLInputElement>) => void
	error?: string
	disabled?: boolean
}

export const LoginPasswordInput: React.FC<PasswordInputProps> = ({
	label,
	placeholder = 'Enter your password',
	value,
	name,
	onChange,
	onBlur,
	error,
	disabled = false,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<div className="mb-2">
			{label && (
				<label
					htmlFor={name}
					className="block mb-2 text-sm font-medium text-gray-700"
				>
					{label}
				</label>
			)}
			<div className="relative">
				<input
					id={name}
					type={showPassword ? 'text' : 'password'}
					name={name}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					disabled={disabled}
					placeholder={placeholder}
					className="w-full px-4 py-3 bg-gray-300 text-gray-900 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ea5933] focus:border-transparent transition duration-200 cursor-text hover:border-[#ea5933] disabled:opacity-70 disabled:cursor-not-allowed"
					{...props}
				/>
				<button
					type="button"
					disabled={disabled}
					className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-blue-500 dark:hover:text-blue-300 focus:outline-none transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={() => setShowPassword((prevState) => !prevState)}
					aria-label={showPassword ? 'Hide password' : 'Show password'}
				>
					<Icon
						icon={showPassword ? 'mdi:eye-off' : 'mdi:eye'}
						width="20"
						height="20"
					/>
				</button>
			</div>
			{error && (
				<p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
			)}
		</div>
	)
}
