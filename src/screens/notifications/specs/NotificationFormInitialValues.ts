import { INotafication } from '@interfaces/notification'
import { IAccManager } from "@interfaces/accManager"

export const getInitialValues = (notification: INotafication) => {

    const accManagersPatch = () => {
        if (!notification.accManagers || notification.accManagers.length === 0) {
            return []
        }
        const accManagers = notification.accManagers.map((el) => {
            const accManager = el as IAccManager
            return `${accManager._id} ${accManager.firstName} ${accManager.familyName}`
        })
        return accManagers
    }

    return {
        title: notification.title ?? "",
        textContent: notification.textContent ?? "",
        module: notification.module ?? "",
        accManagers: accManagersPatch()
    }
}