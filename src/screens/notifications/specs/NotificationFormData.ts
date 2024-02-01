import { INotafication } from "@interfaces/notification"


export const NotificationFormData = {
    create: (values: INotafication,) => {
        const formData = new FormData()
        formData.append("title", values.title)
        formData.append("textContent", values.textContent)
        formData.append("module", values.module)
        const accManagers = values.accManagers.join(" ").split(" ").filter(el => el.length > 20)
        for (let i = 0; i < accManagers.length; i++) {
            formData.append("accManagers", accManagers[i])
        }
        return formData
    },
    update: (values: INotafication) => {
        const jsonData: INotafication = {} as INotafication
        jsonData.title = values.title
        jsonData.textContent = values.textContent
        jsonData.module = values.module
        const accManagers = values.accManagers.join(" ").split(" ").filter(el => el.length > 20)
        jsonData.accManagers = accManagers
        console.log(jsonData)
        return jsonData
    },
}