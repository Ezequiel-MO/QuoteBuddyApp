export interface IPlanningDocument {
	_id?: string
	planningItemId: string
	uploaderId: string
	uploaderType: 'Clients' | 'User'
	fileName: string
	storagePath: string
	mimeType: string
	size: string
}
