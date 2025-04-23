import { IPlanningComment } from './planningComment'
import { IPlanningDocument } from './planningDocument'

export interface IPlanningOption {
	_id?: string
	planningItemId: string
	name: string
	vendorId?: string
	vendorType: string
	planningNotes: string
	isClientSelected: boolean
	createdBy: string
	documents?: IPlanningDocument[]
	comments?: IPlanningComment[]
}
