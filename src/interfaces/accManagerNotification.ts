import { IAccManager } from '@interfaces/accManager'
import { INotification } from '@interfaces/notification'

export interface IAccManagerNotification {
	_id?: string
	read: boolean
	module: 'DBMaster' | 'Projects' | 'FinancialReports' | 'General'
	accManagerId: IAccManager
	notificationId: INotification
	createdAt?: string
	updatedAt?: string
}
