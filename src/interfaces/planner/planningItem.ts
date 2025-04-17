import { IPlanningDocument } from './planningDocument'
import { IPlanningOption } from './planningOption'

export interface IPlanningItem {
	_id?: string
	title: string
	description?: string
	createdBy?: string
	date?: string
	projectId: string
	dayIndex: number
	itemType: 'Meal' | 'Activity' | 'Transfer' | 'Hotel'
	status: 'Proposed' | 'Discussing' | 'Confirmed' | 'Booked'
	selectedOptionId?: string
	originalScheduleItemId?: string
	documents?: IPlanningDocument[]
	options?: IPlanningOption[]
}
