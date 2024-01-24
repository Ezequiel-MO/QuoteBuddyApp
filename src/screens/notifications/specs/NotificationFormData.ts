import { INotafication } from "@interfaces/notification"


export const NotificationFormData = {
    create: (values: INotafication,) => {
        const formData = new FormData()
        formData.append("title", values.title)
        formData.append("textContent", values.textContent)
        return formData
    },
    update: (values: INotafication) => {
        const jsonData: INotafication = {} as INotafication
        jsonData.title = values.title
        jsonData.textContent = values.textContent
        return jsonData
    },
}