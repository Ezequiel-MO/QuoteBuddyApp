import React, { ChangeEvent } from 'react'

interface BooleanSelectInputProps {
	label: string
	name: string
	value: string
	handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const BooleanSelectInput: React.FC<BooleanSelectInputProps> = ({
	label,
	name,
	value,
	handleChange
}) => {
	return (
		<>
			<label className="uppercase text-xl text-gray-600 font-bold mr-2">
				{label}
			</label>
			<select
				name={name}
				value={value}
				onChange={handleChange}
				className="cursor-pointer w-full px-3 py-[10.5px] border rounded-md bg-gray-700 focus:border-blue-500 focus:outline-none text-white-0"
			>
				<option value="true">Cash Flow Verification</option>
				<option value="false">No Cash Flow Verification</option>
			</select>
		</>
	)
}
