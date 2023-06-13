import { Icon } from '@iconify/react'
import { useState } from 'react'

export const PasswordInput = ({
	label,
	placeholder,
	value,
	onChange,
	error,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false)

	return (
		<div className="relative">
			<label
				className="uppercase text-gray-600 block text-xl font-bold"
				htmlFor={label}
			>
				{label}
			</label>
			<input
				className="w-full mt-3 p-3 border rounded-xl bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
				id={label}
				type={showPassword ? 'text' : 'password'}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				{...props}
			/>
			<div
				className="absolute bottom-4 right-4 cursor-pointer "
				onClick={() => setShowPassword((prevState) => !prevState)}
			>
				<Icon icon={`${showPassword ? 'ps:no-eye' : 'mdi:eye'}`} color="#000" />
			</div>
			{error && <p className="text-red-500 text-xs italic">{error}</p>}
		</div>
	)
}
