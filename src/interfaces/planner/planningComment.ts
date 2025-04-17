export interface IPlanningComment {
	_id?: string
	planningItemId: string
	authorId: string
	authorName: string
	authorRole: 'AM' | 'Client'
	date: string
	content: string
}
