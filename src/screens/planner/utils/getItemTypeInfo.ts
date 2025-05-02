/**
 * Get item type icon and color based on item type
 */
const getItemTypeInfo = (itemType: string) => {
	const type = itemType.toLowerCase()

	if (type.includes('hotel') || type.includes('accommodation')) {
		return {
			icon: 'mdi:bed',
			color: 'text-blue-400',
			bgColor: 'bg-blue-900/20'
		}
	}

	if (type.includes('meal') || type.includes('restaurant')) {
		return {
			icon: 'mdi:food-fork-drink',
			color: 'text-amber-400',
			bgColor: 'bg-amber-900/20'
		}
	}

	if (type.includes('transfer') || type.includes('transport')) {
		return {
			icon: 'mdi:bus',
			color: 'text-emerald-400',
			bgColor: 'bg-emerald-900/20'
		}
	}

	if (type.includes('activity')) {
		return {
			icon: 'mdi:kayaking',
			color: 'text-purple-400',
			bgColor: 'bg-purple-900/20'
		}
	}

	return {
		icon: 'mdi:calendar',
		color: 'text-gray-400',
		bgColor: 'bg-gray-700/50'
	}
}
export default getItemTypeInfo
