import React from 'react'

interface CategoryIndicatorProps {
	type:
		| 'accommodation'
		| 'meeting'
		| 'transfer'
		| 'meal'
		| 'activity'
		| 'gift'
		| 'entertainment'
		| string
}

export const CategoryIndicator: React.FC<CategoryIndicatorProps> = ({
	type
}) => {
	// Define icon and color based on category type
	const getIconAndColor = () => {
		switch (type) {
			case 'accommodation':
				return {
					icon: (
						<svg
							className="w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
						</svg>
					),
					bgColor: 'bg-blue-700',
					textColor: 'text-blue-100'
				}
			case 'meeting':
				return {
					icon: (
						<svg
							className="w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
								clipRule="evenodd"
							/>
						</svg>
					),
					bgColor: 'bg-purple-700',
					textColor: 'text-purple-100'
				}
			case 'transfer':
				return {
					icon: (
						<svg
							className="w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
							<path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h6v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-9a1 1 0 00-.293-.707l-2-2A1 1 0 0017 3h-1V2a1 1 0 00-1-1h-2a1 1 0 00-1 1v1H8c-.53 0-1.042.197-1.437.537L3.93 6H3z" />
						</svg>
					),
					bgColor: 'bg-green-700',
					textColor: 'text-green-100'
				}
			case 'meal':
				return {
					icon: (
						<svg
							className="w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M3 6a3 3 0 013-3h10a1 1 0 011 1v10a2 2 0 01-2 2H6a3 3 0 01-3-3V6zm3-1a1 1 0 00-1 1v7a1 1 0 001 1h10V5H6z"
								clipRule="evenodd"
							/>
						</svg>
					),
					bgColor: 'bg-yellow-700',
					textColor: 'text-yellow-100'
				}
			case 'activity':
				return {
					icon: (
						<svg
							className="w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a1 1 0 002 0V6zm0 2a1 1 0 10-2 0v1a1 1 0 102 0V8zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H5zm3 0a1 1 0 100 2h5a1 1 0 100-2H8zm8 2a1 1 0 10-2 0v1a1 1 0 102 0v-1zm-8 4a1 1 0 100 2h.01a1 1 0 100-2H8zm0-2a1 1 0 10-2 0v1a1 1 0 102 0v-1zm10-2a1 1 0 00-2 0v1a1 1 0 102 0v-1zM14 5a1 1 0 10-2 0v1a1 1 0 102 0V5zm0-2a1 1 0 10-2 0v1a1 1 0 102 0V3z"
								clipRule="evenodd"
							/>
						</svg>
					),
					bgColor: 'bg-pink-700',
					textColor: 'text-pink-100'
				}
			case 'gift':
				return {
					icon: (
						<svg
							className="w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h1.17A3 3 0 015 5zm4.05 3.05a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h.5a.75.75 0 01-.75.75h-2a.75.75 0 110-1.5h1z"
								clipRule="evenodd"
							/>
							<path d="M2 13.292A8 8 0 014 12.11v5.51L2 13.291zm4 1.48v4.14l-2-1.313v-4.14L6 14.773zm4-1.094l-2 1.313v-4.14l2-1.313v4.14zm6-4.568l-2 1.313v4.14l2-1.313v-4.14zm-8 3.255l-2-1.313 2-1.313 2 1.313-2 1.313z" />
						</svg>
					),
					bgColor: 'bg-red-700',
					textColor: 'text-red-100'
				}
			case 'entertainment':
				return {
					icon: (
						<svg
							className="w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
								clipRule="evenodd"
							/>
						</svg>
					),
					bgColor: 'bg-indigo-700',
					textColor: 'text-indigo-100'
				}
			default:
				return {
					icon: (
						<svg
							className="w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
								clipRule="evenodd"
							/>
						</svg>
					),
					bgColor: 'bg-gray-700',
					textColor: 'text-gray-100'
				}
		}
	}

	const { icon, bgColor, textColor } = getIconAndColor()

	return (
		<div
			className={`flex items-center justify-center p-2 rounded-full ${bgColor} shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110`}
		>
			<div className={`${textColor}`}>{icon}</div>
		</div>
	)
}

// Export styling constants for different category types
export const categoryStyles = {
	accommodation: {
		header: 'bg-blue-900/40 border-blue-700/50 shadow-blue-900/20 shadow-inner',
		row: 'hover:bg-blue-800/30 hover:shadow-md',
		icon: 'text-blue-300',
		title: 'text-blue-200'
	},
	meeting: {
		header:
			'bg-purple-900/40 border-purple-700/50 shadow-purple-900/20 shadow-inner',
		row: 'hover:bg-purple-800/30 hover:shadow-md',
		icon: 'text-purple-300',
		title: 'text-purple-200'
	},
	transfer: {
		header:
			'bg-green-900/40 border-green-700/50 shadow-green-900/20 shadow-inner',
		row: 'hover:bg-green-800/30 hover:shadow-md',
		icon: 'text-green-300',
		title: 'text-green-200'
	},
	meal: {
		header:
			'bg-yellow-900/40 border-yellow-700/50 shadow-yellow-900/20 shadow-inner',
		row: 'hover:bg-yellow-800/30 hover:shadow-md',
		icon: 'text-yellow-300',
		title: 'text-yellow-200'
	},
	activity: {
		header: 'bg-pink-900/40 border-pink-700/50 shadow-pink-900/20 shadow-inner',
		row: 'hover:bg-pink-800/30 hover:shadow-md',
		icon: 'text-pink-300',
		title: 'text-pink-200'
	},
	gift: {
		header: 'bg-red-900/40 border-red-700/50 shadow-red-900/20 shadow-inner',
		row: 'hover:bg-red-800/30 hover:shadow-md',
		icon: 'text-red-300',
		title: 'text-red-200'
	},
	entertainment: {
		header:
			'bg-indigo-900/40 border-indigo-700/50 shadow-indigo-900/20 shadow-inner',
		row: 'hover:bg-indigo-800/30 hover:shadow-md',
		icon: 'text-indigo-300',
		title: 'text-indigo-200'
	}
}
