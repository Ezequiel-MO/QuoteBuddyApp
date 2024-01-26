import {IAccManager} from "@interfaces/accManager"
import {INotafication} from "@interfaces/notification"

export interface IAccManagerNotification {
    _id?: string
    read: boolean
    accManagerId: IAccManager
    notificationId: INotafication
    createdAt?: string
    updatedAt?: string
}