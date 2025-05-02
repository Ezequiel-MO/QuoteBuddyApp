/**
 * Get status information (color, text, icon)
 */
const getStatusInfo = (status: string) => {
	switch (status) {
		case 'Confirmed':
			return {
				color: 'bg-green-600',
				textColor: 'text-white-50',
				icon: 'mdi:check-circle'
			}
		case 'Discussing':
			return {
				color: 'bg-yellow-600',
				textColor: 'text-yellow-400',
				icon: 'mdi:message-processing'
			}
		case 'Booked':
			return {
				color: 'bg-blue-600',
				textColor: 'text-blue-400',
				icon: 'mdi:calendar-check'
			}
		case 'Proposed':
		default:
			return {
				color: 'bg-gray-600',
				textColor: 'text-gray-400',
				icon: 'mdi:lightbulb-outline'
			}
	}
}
export default getStatusInfo
