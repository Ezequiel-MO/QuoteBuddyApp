import React, { FC } from "react"
import { ICollectionFromClient } from "src/interfaces"
import { ButtonDeleteWithAuth } from 'src/components/atoms'
import { usePaymentSlip } from "@screens/payment_slip/context/PaymentSlipContext"


interface CollectionsFromClientRowProps {
    collectionFromClient: ICollectionFromClient
}


export const CollectionsFromClientRow: FC<CollectionsFromClientRowProps> = ({ collectionFromClient }) => {
    const { stateProject, isLoading, setForceRefresh, dispatch } = usePaymentSlip()


    const typesStatus = ["ISSUED", "RECEIVED", "PENDING"]
    return (
        <tr className="hover:bg-gray-200 hover:text-black-50">
            <td align="left" className="px-6 uppercase">
                {collectionFromClient.type}
            </td>
            <td align="left" className="px-6 uppercase">
                {collectionFromClient.dueDate}
            </td>
            <td align="left" className="px-6 uppercase">
                {collectionFromClient.amount}
            </td>
            <td
                align="left"
                className={`px-6 uppercase ${typesStatus.includes(collectionFromClient.status) ? "text-green-500" : "text-red-500"} `}
            >
                {collectionFromClient.status}
            </td>
            <td>
                <ButtonDeleteWithAuth
                    endpoint={'collectionsFromClients'}
                    ID={collectionFromClient._id}
                    setter={(updatedCollectionsFromClient: ICollectionFromClient[]) =>
                        dispatch({
                            type: "DELETED_COLLECTION_FROM_CLIENT",
                            payload: {
                                updatedCollectionsFromClient
                            }
                        })
                    }
                    items={stateProject?.collectionsFromClient || []}
                />
            </td>
        </tr>
    )
}