export interface ITicket {
	_id: string
	nr: number
	title: string
	description: string
	category: string
	priority: number
	progress: number
	status: 'done' | 'started' | 'not started'
	active: boolean
	createdAt: number
}
