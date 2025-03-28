import React from 'react'
import { Icon } from '@iconify/react'
import { categoryColors } from './constants/CategoryColors'

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
	const getIconAndColor = () => {
		const colors =
			categoryColors[type as keyof typeof categoryColors] ||
			categoryColors['default']
		let icon
		switch (type) {
			case 'accommodation':
				icon = 'mdi:bed'
				break
			case 'meeting':
				icon = 'mdi:handshake'
				break
			case 'transfer':
				icon = 'mdi:bus'
				break
			case 'meal':
				icon = 'mdi:food-fork-drink'
				break
			case 'activity':
				icon = 'mdi:kayaking'
				break
			case 'gift':
				icon = 'mdi:gift'
				break
			case 'entertainment':
				icon = 'mdi:music'
				break
			default:
				icon = 'mdi:tag'
				break
		}
		return {
			icon,
			bgColor: colors.bg,
			textColor: colors.text
		}
	}

	const { icon, bgColor, textColor } = getIconAndColor()

	return (
		<div
			className={`flex items-center justify-center p-1.5 rounded-md ${bgColor} shadow-md transform transition-transform duration-200 hover:scale-105`}
		>
			<div className={`${textColor}`}>
				<Icon icon={icon} width="18" height="18" />
			</div>
		</div>
	)
}

// categoryStyles remains unchanged as it serves a different purpose
export const categoryStyles = {
	accommodation: {
		color: 'blue',
		header: 'bg-blue-900/20 border-blue-700/30',
		row: 'hover:bg-blue-800/10',
		icon: 'text-blue-400',
		title: 'text-blue-300'
	},
	meeting: {
		color: 'purple',
		header: 'bg-purple-900/20 border-purple-700/30',
		row: 'hover:bg-purple-800/10',
		icon: 'text-purple-400',
		title: 'text-purple-300'
	},
	transfer: {
		color: 'green',
		header: 'bg-green-900/20 border-green-700/30',
		row: 'hover:bg-green-800/10',
		icon: 'text-green-400',
		title: 'text-green-300'
	},
	meal: {
		color: 'yellow',
		header: 'bg-yellow-900/20 border-yellow-700/30',
		row: 'hover:bg-yellow-800/10',
		icon: 'text-yellow-400',
		title: 'text-yellow-300'
	},
	activity: {
		color: 'pink',
		header: 'bg-pink-900/20 border-pink-700/30',
		row: 'hover:bg-pink-800/10',
		icon: 'text-pink-400',
		title: 'text-pink-300'
	},
	gift: {
		color: 'red',
		header: 'bg-red-900/20 border-red-700/30',
		row: 'hover:bg-red-800/10',
		icon: 'text-red-400',
		title: 'text-red-300'
	},
	entertainment: {
		color: 'indigo',
		header: 'bg-indigo-900/20 border-indigo-700/30',
		row: 'hover:bg-indigo-800/10',
		icon: 'text-indigo-400',
		title: 'text-indigo-300'
	}
}
