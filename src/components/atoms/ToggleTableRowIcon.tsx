import React from 'react'

interface ToggleTableRowIconProps {
	isOpen: boolean
	toggle: () => void
}

export const ToggleTableRowIcon: React.FC<ToggleTableRowIconProps> = ({
	isOpen,
	toggle
}) => {
	return (
		<td className="px-4 py-4 w-10">
			<button
				onClick={toggle}
				className="group rounded-full p-1.5 hover:bg-blue-600 text-white-0 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
				aria-label={isOpen ? 'Hide details' : 'Show details'}
			>
				<svg
					className={`w-4 h-4 transform transition-transform duration-300 ease-in-out ${
						isOpen ? 'rotate-180' : ''
					}`}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
		</td>
	)
}
