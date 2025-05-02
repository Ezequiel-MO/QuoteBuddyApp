import { IPlanningItem } from '@interfaces/planner'

// Get status color based on status
const getPlanningItemStatusColor = (item: IPlanningItem) => {
	switch (item.status) {
		case 'Confirmed':
			return 'bg-green-600'
		case 'Discussing':
			return 'bg-yellow-600'
		case 'Booked':
			return 'bg-blue-600'
		case 'Proposed':
		default:
			return 'bg-gray-600'
	}
}

export default getPlanningItemStatusColor
