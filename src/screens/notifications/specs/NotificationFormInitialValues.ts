import { INotafication } from '@interfaces/notification'

export const getInitialValues = (notification: INotafication) => {
    return {
        title: notification.title ?? "",
        textContent: notification.textContent ?? "",
    }
}