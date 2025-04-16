export interface IPlanningComment {
	_id?: string
	planningItemId: string
	authorId: string
	authorRole: 'AM' | 'Client'
	content: string
}
