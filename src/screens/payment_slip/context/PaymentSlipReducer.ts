import { PaymentSlipActions } from "./interfaces"
import { IProject } from "@interfaces/project"

export const SET_PROJECT = 'SET_PROJECT'
export const DELETED_COLLECTION_FROM_CLIENT = "DELETED_COLLECTION_FROM_CLIENT"



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
        default:
            return state
    }
}