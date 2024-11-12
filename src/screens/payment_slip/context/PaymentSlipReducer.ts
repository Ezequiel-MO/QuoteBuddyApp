import { PaymentSlipActions, IProjectState } from "./interfaces"
import { IProject } from "@interfaces/project"

export const SET_PROJECT = 'SET_PROJECT'
export const UPDATE_PROJECT_FIELD = 'UPDATE_PROJECT_FIELD'
export const DELETED_COLLECTION_FROM_CLIENT = "DELETED_COLLECTION_FROM_CLIENT"
export const ADD_COLLECTION_FROM_CLIENT = "ADD_COLLECTION_FROM_CLIENT"
export const UPDATE_COLLECTION_FROM_CLIENT = "UPDATE_COLLECTION_FROM_CLIENT"



export const paymentSlipReducer = (state: IProjectState, action: PaymentSlipActions): IProjectState => {
    switch (action.type) {
        case SET_PROJECT: {
            const { project } = action.payload
            return project
        }
        case UPDATE_PROJECT_FIELD: {
            const { keyProject, value } = action.payload
            return {
                ...state,
                [keyProject]: value
            }
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