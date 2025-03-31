export interface IOtherOperational {
	_id: string
	name: string
	city: string
	textContent?: string
	suppliers?: string[]
	isDeleted: boolean
	setImgUrl(files: any[]): void
	softDelete(): Promise<void>
	deletedAt: string
}
