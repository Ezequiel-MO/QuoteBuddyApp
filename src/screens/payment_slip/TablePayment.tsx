import React, { FC, useState } from "react"
import { TableHeaders } from "src/ui"
import { InvoicesRow } from "./InvoicesRow"
import { CollectionsFromClientRow } from "./CollectionsFromClientRow"
import { usePaymentSlip } from "@screens/payment_slip/context/PaymentSlipContext"
import { Button } from "@components/atoms"
import { ModalCollectionFromClientForm } from "./ModalCollectionFromClientForm"
import { ICollectionFromClient } from "@interfaces/collectionFromClient"



export const TablePayment = () => {
    const { stateProject: project, setIsUpdate, setCollectionFromClient } = usePaymentSlip()

    if (!project) {
        return null
    }

    const [openModal, setOpenModal] = useState(false)

    const handleOpenModalAdd = () => {
        setCollectionFromClient({} as ICollectionFromClient)
        setOpenModal(true)
        setIsUpdate(false)
    }

    return (
        <>
            <table className='mt-10 min-w-full  table-auto border-collapse border-2'>
                <TableHeaders headers='paymentSlimp' />
                <tbody className="divide-y divide-gray-300">
                    {
                        project.invoices && project.invoices.map((invoice, index) => {
                            return (
                                <InvoicesRow invoice={invoice} key={invoice._id} />
                            )
                        })
                    }
                    {
                        project.collectionsFromClient &&
                        project.collectionsFromClient.map((collectionFromClient, index) => {
                            return (
                                <CollectionsFromClientRow collectionFromClient={collectionFromClient} key={collectionFromClient._id} />
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="mt-4 flex justify-end mr-2">
                <ModalCollectionFromClientForm open={openModal} setOpen={setOpenModal} />
                <Button
                    newClass="
                    flex items-center gap-1 flex-none  bg-black-50 hover:animate-pulse
                    hover:bg-orange-50 text-white-100 uppercase font-semibold 
                    py-2 px-2 border border-orange-50 rounded-md 
                    transition-transform transform active:scale-95
                    "
                    icon="basil:add-outline"
                    widthIcon={30}
                    handleClick={handleOpenModalAdd}
                >
                    add collection or proforma
                </Button>
            </div>
        </>
    )
}