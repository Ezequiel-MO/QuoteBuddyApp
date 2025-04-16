export interface DisplayPlanningItem {
	id?: number | string
	_id?: string
	title: string
	description?: string
	createdBy?: string
	date?: string
	documents?: Array<{ id: string; name: string; size: string }>
	options?: Array<{
		id: number | string
		title: string
		description?: string
		comments?: Array<{
			id: number | string
			author: string
			role: string
			date: string
			text: string
		}>
	}>
	// Fields from IPlanningItem
	projectId?: string
	dayIndex?: number
	itemType?: string
	status?: string
	selectedOptionId?: string
	originalScheduleItemId?: string
}

export interface Document {
	id: string
	name: string
	size: string
}

export interface Comment {
	id: number | string
	author: string
	role: string
	date: string
	text: string
}

export interface Option {
	id: number | string
	title: string
	description?: string
	comments?: Comment[]
}
