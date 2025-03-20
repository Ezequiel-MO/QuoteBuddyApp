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
		<div className="relative w-64 max-w-full">
			<select
				value={value || ''}
				onChange={handleChange}
				title={value} // Show full text on hover
				className="w-full py-2 pl-3 pr-8 bg-gray-700/20 text-gray-100 
                  border border-gray-600/30 rounded-md 
                  focus:outline-none focus:ring-1 
                  focus:ring-blue-500/50 focus:border-blue-500/50
                  cursor-pointer transition-all duration-200 
                  hover:bg-gray-600/30 overflow-hidden text-ellipsis"
				style={{
					// Hide default arrow in all browsers
					appearance: 'none',
					WebkitAppearance: 'none',
					MozAppearance: 'none',
					// Remove any background image that might show an arrow
					backgroundImage: 'none'
				}}
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
			{/* Single custom dropdown arrow */}
			<div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
				<svg
					className="w-4 h-4 text-gray-400/50"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
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
