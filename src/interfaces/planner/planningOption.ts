import { IPlanningComment } from './planningComment'
import { IPlanningDocument } from './planningDocument'

export interface IPlanningOption {
	_id?: string
	planningItemId: String
	vendorId: String
	vendorType: String
	planningNotes: String
	isClientSelected: boolean
	createdBy: String
	documents?: IPlanningDocument[]
	comments?: IPlanningComment[]
}
