/**
 * Get vendor type icon and color based on vendor type
 */
const getVendorTypeInfo = (vendorType: string) => {
	const type = vendorType.toLowerCase()

	if (type.includes('hotel') || type.includes('accommodation')) {
		return { icon: 'mdi:bed', color: 'text-blue-400' }
	}

	if (
		type.includes('restaurant') ||
		type.includes('food') ||
		type.includes('meal')
	) {
		return { icon: 'mdi:food-fork-drink', color: 'text-amber-400' }
	}

	if (type.includes('transport') || type.includes('transportation')) {
		return { icon: 'mdi:bus', color: 'text-emerald-400' }
	}

	if (type.includes('activity') || type.includes('experience')) {
		return { icon: 'mdi:kayaking', color: 'text-purple-400' }
	}

	if (type.includes('guide')) {
		return { icon: 'mdi:account-tie', color: 'text-cyan-400' }
	}

	return { icon: 'mdi:tag', color: 'text-gray-400' }
}

export default getVendorTypeInfo
