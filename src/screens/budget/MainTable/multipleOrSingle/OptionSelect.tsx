import React from 'react'

export interface OptionSelectProps {
	options: any[]
	value: string
	handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const OptionSelect: React.FC<OptionSelectProps> = ({
	options,
	value,
	handleChange
}) => {
	return (
		<div className="relative text-gray-300 w-full group">
			<select
				value={value || ''}
				onChange={handleChange}
				className="w-full py-2.5 pl-4 pr-10 bg-gray-700/90 text-gray-200 border border-gray-600/80 rounded-md shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-opacity-75 cursor-pointer transition-all duration-200 hover:bg-gray-600/90"
			>
				{options.map((option) => (
					<option
						key={option._id}
						value={option.name}
						className="bg-gray-700 text-gray-200"
					>
						{option.name}
					</option>
				))}
			</select>
			<div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none group-hover:text-blue-300 transition-colors duration-200">
				<svg
					className="w-5 h-5 text-gray-400"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
			</div>
		</div>
	)
}
