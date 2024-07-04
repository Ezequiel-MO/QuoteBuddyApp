import { IAccManager } from '@interfaces/accManager'
export interface INotification {
	_id: string
	title: string
	textContent: string
	module: 'DBMaster' | 'Projects' | 'FinancialReports' | 'General'
	accManagers: IAccManager[] | string[]
	createdAt?: string
	updatedAt?: string
}
