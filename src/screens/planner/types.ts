export interface DisplayPlanningItem {
	// Base IPlanningItem fields
	_id?: string
	title: string
	projectId: string
	dayIndex: number
	itemType: 'Meal' | 'Activity' | 'Transfer' | 'Hotel'
	status: 'Proposed' | 'Discussing' | 'Confirmed' | 'Booked'
	selectedOptionId?: string
	originalScheduleItemId?: string

	// Additional display fields
	description?: string
	createdBy?: string
	date?: string
	documents?: Array<{ id: string; name: string; size: string }>
	options?: Array<{
		id: string
		title: string
		description?: string
		comments?: Array<{
			id: string
			author: string
			role: string
			date: string
			text: string
		}>
	}>
}

export interface Document {
	id: string
	name: string
	size: string
}

export interface Comment {
	id: string
	author: string
	role: string
	date: string
	text: string
}

export interface Option {
	id: string
	title: string
	description?: string
	comments?: Comment[]
}
