export interface IPlanningItem {
	projectId: string
	dayIndex: number
	itemType: 'Meal' | 'Activity' | 'Transfer' | 'Hotel'
	status: 'Proposed' | 'Discussing' | 'Confirmed' | 'Booked'
	selectedOptionId?: string
	originalScheduleItemId?: string
	title: string
}
