import { ICollectionFromClient } from 'src/interfaces/'

export const getInitialValues = (collectionFromClient: ICollectionFromClient) => {
    return {
        dueDate: collectionFromClient.dueDate ?? "",
        amount: collectionFromClient.amount ?? "",
        type: collectionFromClient.type ?? "",
        status: collectionFromClient.status ?? "",
        clientCompanyId: collectionFromClient.clientCompanyId ?? "",
        projectId: collectionFromClient.projectId ?? ""
    }
}