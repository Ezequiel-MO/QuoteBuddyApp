export interface IPlanningDocument {
	_id?: string
	planningItemId: string
	planningOptionId?: string
	uploaderId:
		| string
		| {
				_id: string
				name: string
				email: string
				role: string
		  }
	uploaderType: 'Clients' | 'User' | 'AccManagers'
	fileName: string
	storagePath: string
	mimeType: string
	size: string
	isDeleted?: boolean
	deletedAt?: string | null
	createdAt?: string
	updatedAt?: string
}
