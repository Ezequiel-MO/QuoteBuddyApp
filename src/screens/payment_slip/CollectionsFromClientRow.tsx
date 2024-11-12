import React, { FC, useState } from "react"
import { ICollectionFromClient } from "src/interfaces"
import { ButtonDeleteWithAuth, Button } from 'src/components/atoms'
import { usePaymentSlip } from "@screens/payment_slip/context/PaymentSlipContext"
import { ModalCollectionFromClientForm } from "./ModalCollectionFromClientForm"
import accounting from 'accounting'



interface CollectionsFromClientRowProps {
    collectionFromClient: ICollectionFromClient
}


export const CollectionsFromClientRow: FC<CollectionsFromClientRowProps> = ({ collectionFromClient }) => {
    const { stateProject, dispatch, setIsUpdate, setCollectionFromClient } = usePaymentSlip()

    const [openModalUpdate, setOpenModalUpdate] = useState(false)

    const handleOpenUpdateModal = () => {
        setCollectionFromClient(collectionFromClient)
        setIsUpdate(true)
        setOpenModalUpdate(true)
    }


    const typesStatus = ["ISSUED", "RECEIVED", "PENDING"]
    return (
        <tr className="hover:bg-gray-200 hover:text-black-50">
            <td align="left" className="px-3 uppercase">
                {collectionFromClient.type}
            </td>
            <td align="left" className="px-3 uppercase">
                {collectionFromClient.dueDate}
            </td>
            <td align="left" className="px-3 uppercase">
                {accounting.formatMoney(collectionFromClient.amount, '€')}
            </td>
            <td
                align="left"
                className={`px-3 uppercase ${typesStatus.includes(collectionFromClient.status) ? "text-green-500" : "text-red-500"} `}
            >
                {collectionFromClient.status}
            </td>
            <td align="left" className="py-1">
                <ModalCollectionFromClientForm
                    open={openModalUpdate}
                    setOpen={setOpenModalUpdate}
                />
                <Button
                    newClass="
                    bg-black-50 hover:animate-pulse
                    hover:bg-blue-500 text-white-100 uppercase font-semibold 
                    px-2 border border-green-500 rounded-md 
                    transition-transform transform active:scale-95
                    "
                    icon=""
                    handleClick={handleOpenUpdateModal}
                >
                    Update
                </Button>
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