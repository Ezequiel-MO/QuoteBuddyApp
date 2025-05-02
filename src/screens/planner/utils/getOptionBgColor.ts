/**
 * Get background color based on vendor type with enhanced visual distinction
 */
export const getOptionBgColor = (
	index: number,
	vendorType?: string
): string => {
	// Define more distinctive color schemes for different vendor types
	if (vendorType) {
		const type = vendorType.toLowerCase()

		if (type.includes('hotel') || type.includes('accommodation')) {
			return 'bg-blue-900/20 border-blue-700/50 shadow-blue-900/20 shadow-inner'
		}

		if (
			type.includes('restaurant') ||
			type.includes('food') ||
			type.includes('meal')
		) {
			return 'bg-indigo-800/20 border-amber-700/50 shadow-amber-900/20 shadow-inner'
		}

		if (type.includes('transport') || type.includes('transportation')) {
			return 'bg-emerald-900/20 border-emerald-700/50 shadow-emerald-900/20 shadow-inner'
		}

		if (type.includes('activity') || type.includes('experience')) {
			return 'bg-purple-900/20 border-purple-700/50 shadow-purple-900/20 shadow-inner'
		}

		if (type.includes('guide')) {
			return 'bg-cyan-900/20 border-cyan-700/50 shadow-cyan-900/20 shadow-inner'
		}
	}

	// Enhanced alternating colors for better distinction
	const baseColors = [
		'bg-gray-800/70 border-gray-700/80 shadow-gray-900/30 shadow-inner',
		'bg-gray-750/80 border-gray-600/80 shadow-gray-900/30 shadow-inner',
		'bg-gray-700/70 border-gray-600/80 shadow-gray-900/30 shadow-inner'
	]

	return baseColors[index % baseColors.length]
}
