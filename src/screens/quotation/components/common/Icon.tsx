// src/screens/quotation/components/common/Icon.tsx
import React from 'react'

interface IconProps {
	name: string
	className?: string
	width?: number
	height?: number
	color?: string
}

// This is a simplified icon component
// You will replace this with react-iconify icons
const Icon: React.FC<IconProps> = ({
	name,
	className = '',
	width = 24,
	height,
	color = 'currentColor'
}) => {
	// This will be your mapping of icon names to SVG paths
	const iconPaths: Record<string, string> = {
		'chevron-down': 'M19 9l-7 7-7-7',
		'chevron-up': 'M5 15l7-7 7 7',
		'chevron-right': 'M9 5l7 7-7 7',
		'chevron-left': 'M15 19l-7-7 7-7',
		menu: 'M3 12h18M3 6h18M3 18h18',
		close: 'M18 6L6 18M6 6l12 12',
		calendar:
			'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
		hotel: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m0 0h14m-4-5H7m0-5h2m2 0h2',
		coin: 'M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm1-5h-2v-2h2v2zm-2-4V7h2v4h-2z',
		activity: 'M22 12h-4l-3 9L9 3l-3 9H2',
		restaurant:
			'M7 17h10M3 12l18 0M3 13a9 9 0 0 0 9 9 9 9 0 0 0 9-9M11 3v10M8 6h6',
		briefcase:
			'M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM8 5h8v2H8V5zm11 16H5V9h14v12z',
		document:
			'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
		bus: 'M8 7h8m-8 5h8m-8 5h8M4 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm0 15h16',
		group: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2',
		location:
			'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
		'weather-sunset-up':
			'M17 18a5 5 0 0 0-10 0M12 9V2M4.22 10.22l1.42 1.42M1 18h2M21 18h2M18.36 11.64l-1.42-1.42M23 22H1M16 6l-4-4-4 4',
		'weather-sunset-down':
			'M17 18a5 5 0 0 0-10 0M12 9V2M4.22 10.22l1.42 1.42M1 18h2M21 18h2M18.36 11.64l-1.42-1.42M23 22H1M16 16l-4 4-4-4'
		// Add more icons as needed
	}

	// If icon path doesn't exist, return a placeholder or null
	if (!iconPaths[name]) {
		console.warn(`Icon "${name}" not found`)
		return null
	}

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height || width}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<path d={iconPaths[name]} />
		</svg>
	)
}

export default Icon
