export interface IPlanningItem {
	_id?: string
	description?: string
	projectId: string
	dayIndex: number
	itemType: 'Meal' | 'Activity' | 'Transfer' | 'Hotel'
	status: 'Proposed' | 'Discussing' | 'Confirmed' | 'Booked'
	selectedOptionId?: string
	originalScheduleItemId?: string
	title: string
}
