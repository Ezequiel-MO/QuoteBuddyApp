export interface IPlanningDocument {
	_id?: string
	planningItemId: string
	uploaderId: string
	uploaderType: 'AccManagers' | 'Clients'
	fileName: string
	storagePath: string
	mimeType: string
	size: string
}
