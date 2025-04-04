export interface IGift {
	_id: string
	name: string
	qty: number
	price: number
	budgetNotes?: string
	textContent: string
	imageContentUrl: string[]
	isDeleted: boolean
	deletedAt: string
}
