import { PaymentSlipActions } from "./interfaces"
import { IProject } from "@interfaces/project"

export const SET_PROJECT = 'SET_PROJECT'
export const DELETED_COLLECTION_FROM_CLIENT = "DELETED_COLLECTION_FROM_CLIENT"
export const ADD_COLLECTION_FROM_CLIENT = "ADD_COLLECTION_FROM_CLIENT"
export const UPDATE_COLLECTION_FROM_CLIENT = "UPDATE_COLLECTION_FROM_CLIENT"



export const paymentSlipReducer = (state: IProject, action: PaymentSlipActions): IProject => {
    switch (action.type) {
        case SET_PROJECT: {
            const { project } = action.payload
            return project
        }
        case DELETED_COLLECTION_FROM_CLIENT: {
            const { updatedCollectionsFromClient } = action.payload
            return {
                ...state,
                collectionsFromClient: updatedCollectionsFromClient
            }
        }
        case ADD_COLLECTION_FROM_CLIENT: {
            const { addCollectionFromClient } = action.payload
            const stateCopy: IProject = JSON.parse(JSON.stringify(state))
            const collectionsFromClientCopy = [...stateCopy.collectionsFromClient, addCollectionFromClient]
            return {
                ...state,
                collectionsFromClient: collectionsFromClientCopy
            }
        }
        case UPDATE_COLLECTION_FROM_CLIENT: {
            const { updatedCollectionFromClient } = action.payload
            const stateCopy: IProject = JSON.parse(JSON.stringify(state))
            const collectionFromClientIndex = stateCopy.collectionsFromClient.findIndex(el => el._id === updatedCollectionFromClient._id)
            const collectionsFromClientCopy = stateCopy.collectionsFromClient
            collectionsFromClientCopy[collectionFromClientIndex] = updatedCollectionFromClient
            return {
                ...state,
                collectionsFromClient: collectionsFromClientCopy
            }
        }
        default:
            return state
    }
}