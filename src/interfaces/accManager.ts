export interface IAccManager {
	_id: string
	firstName: string
	familyName: string
	email: string
	imageContentUrl: string[]
	deletedImage?: any
	isDeleted: boolean
	deletedAt: string
}
