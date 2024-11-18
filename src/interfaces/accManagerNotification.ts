import { IAccManager } from '@interfaces/accManager'
import { INotafication } from '@interfaces/notification'

export interface IAccManagerNotification {
	_id?: string
	read: boolean
	module: 'DBMaster' | 'Projects' | 'FinancialReports' | 'General'
	accManagerId: IAccManager
	notificationId: INotafication
	createdAt?: string
	updatedAt?: string
}
