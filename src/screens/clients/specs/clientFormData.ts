import { IClient, IClientNote } from '@interfaces/client'


export const ClientFormData = {
    create: (values: IClient) => {
        const jsonData: IClient = {} as IClient
        jsonData.firstName = values.firstName
        jsonData.familyName = values.familyName
        jsonData.email = values.email
        jsonData.phone = values.phone
        jsonData.country = values.country
        jsonData.quoteLanguage = values.quoteLanguage
        if (values.clientCompany) {
            jsonData.clientCompany = values.clientCompany
        }
        if (values.origin?.method) {
            jsonData.origin = values.origin
        }
        if (values.qualification?.status) {
            jsonData.qualification = values.qualification
        }
        if (values.clientNotes && values.clientNotes.length > 0) {
            const clientNotes = values.clientNotes.map(el => {
                if (el.type) {
                    return el
                }
            }).filter(el => el).
                sort((a, b) => {
                    const dateA = new Date(a!.date).getTime()
                    const dateB = new Date(b!.date).getTime()
                    return dateB - dateA
                })
            if (clientNotes && clientNotes.length > 0) {
                jsonData.clientNotes = clientNotes as IClientNote[]
            }
        }
        return jsonData
    },
    update: (values: IClient) => {
        const jsonData: IClient = {} as IClient
        jsonData.firstName = values.firstName
        jsonData.familyName = values.familyName
        jsonData.email = values.email
        jsonData.phone = values.phone
        jsonData.country = values.country
        jsonData.quoteLanguage = values.quoteLanguage
        if (values.clientCompany) {
            jsonData.clientCompany = values.clientCompany
        }
        if (values.origin?.method) {
            jsonData.origin = values.origin
        }
        if (values.qualification?.status) {
            jsonData.qualification = values.qualification
        }
        if (values.clientNotes) {
            const clientNotes = values.clientNotes.map(el => {
                if (el.type) {
                    return el
                }
            }).filter(el => el !== undefined).
                sort((a, b) => {
                    const dateA = new Date(a!.date).getTime()
                    const dateB = new Date(b!.date).getTime()
                    return dateB - dateA
                })
            if (clientNotes) {
                jsonData.clientNotes = clientNotes as IClientNote[]
            }
        }
        return jsonData
    }
}