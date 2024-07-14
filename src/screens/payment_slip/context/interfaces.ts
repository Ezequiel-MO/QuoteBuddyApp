import {
    SET_PROJECT,
    DELETED_COLLECTION_FROM_CLIENT,
    ADD_COLLECTION_FROM_CLIENT,
    UPDATE_COLLECTION_FROM_CLIENT
} from "./PaymentSlipReducer"
import { IProject } from "@interfaces/project"
import { ICollectionFromClient } from "@interfaces/collectionFromClient"
import { IVendorInvoice } from "@interfaces/vendorInvoice"

export interface IProjectState extends IProject{
    vendorInvoices: IVendorInvoice[]
}



type SetProject = {
    type: typeof SET_PROJECT
    payload: {
        project: IProjectState
    }
}

type DeletedCollectionFromClient = {
    type: typeof DELETED_COLLECTION_FROM_CLIENT,
    payload: {
        updatedCollectionsFromClient: ICollectionFromClient[]
    }
}

type AddCollectionFromClient = {
    type: typeof ADD_COLLECTION_FROM_CLIENT,
    payload: {
        addCollectionFromClient: ICollectionFromClient
    }
}

type UpdateCollectionFromClient = {
    type: typeof UPDATE_COLLECTION_FROM_CLIENT,
    payload: {
        updatedCollectionFromClient: ICollectionFromClient
    }
}

export type PaymentSlipActions =
    | SetProject
    | DeletedCollectionFromClient
    | AddCollectionFromClient
    | UpdateCollectionFromClient