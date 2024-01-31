import {IAccManager} from "@interfaces/accManager"
export interface INotafication {
    _id: string
    title: string
    textContent: string
    module: "DBMaster" | "Projects" | "FinancialReports" | 'General'
    accManagers: IAccManager[] | string[] // ESTO ESTA EN FASE BETA
    createdAt?: string
    updatedAt?: string
}