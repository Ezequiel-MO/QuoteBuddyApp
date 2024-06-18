export interface ICollectionFromClient {
    _id: string
    dueDate: string
    amount: number
    type: 'PROFORMA' | 'COLLECTION'
    status: 'ISSUED' | 'RECEIVED' | 'PENDING' | 'OVERDUE'
    projectId: string
    clientCompanyId: string
    isDeleted: boolean
}