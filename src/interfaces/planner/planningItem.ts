import { IPlanningDocument } from './planningDocument'
import { IPlanningOption } from './planningOption'
import { IAccManager } from '@interfaces/accManager'

export interface IPlanningItem {
	_id?: string
	title: string
	description?: string
	createdBy?: string | IAccManager // Can be just an ID string or a populated account manager
	date?: string
	projectId: string
	dayIndex: number
	itemType: 'Meal' | 'Activity' | 'Transfer' | 'Hotel'
	status: 'Proposed' | 'Discussing' | 'Confirmed' | 'Booked'
	selectedOptionId?: string
	originalScheduleItemId?: string
	documents?: IPlanningDocument[]
	options?: IPlanningOption[]
	isDeleted?: boolean
	deletedAt?: string | null
	createdAt?: string
	updatedAt?: string
}
