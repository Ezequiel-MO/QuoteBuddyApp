import { FC, useState } from 'react'
import { ICollectionFromClient } from '@interfaces/collectionFromClient'
import accounting from 'accounting'
import { ModalMenuActions } from "src/components/atoms/modal/ModalMenuActions"
import { Icon } from '@iconify/react'
import { usePaymentSlip } from '@screens/payment_slip/context/PaymentSlipContext'
import { ModalCollectionFromClientForm } from './ModalCollectionFromClientForm'
import { removeItemFromList } from 'src/helper/RemoveItemFromList'
import { useAuth } from 'src/context/auth/AuthProvider'



interface TableInvoiceCollectionsFromClientProps {
    collectionsFromClient: ICollectionFromClient[]
}

export const TableInvoiceCollectionsFromClient: FC<
    TableInvoiceCollectionsFromClientProps
> = ({ collectionsFromClient }) => {

    const { stateProject, dispatch, setIsUpdate, setCollectionFromClient, setForceRefresh } = usePaymentSlip()

    const [openModalUpdate, setOpenModalUpdate] = useState(false)

    const { auth } = useAuth()

    const handleOpenUpdateModal = (collectionFromClient: ICollectionFromClient) => {
        setCollectionFromClient(collectionFromClient)
        setIsUpdate(true)
        setOpenModalUpdate(true)
    }

    const typesStatus = ['ISSUED', 'RECEIVED', 'PENDING']

    if (!collectionsFromClient) {
        return null
    }

    return (
        <>
            <ModalCollectionFromClientForm
                open={openModalUpdate}
                setOpen={setOpenModalUpdate}
            />
            {
                collectionsFromClient?.map((collectionFromClient) => (
                    <tr
                        key={collectionFromClient._id}
                        className="bg-black-50 hover:bg-gray-200 hover:text-black-50"
                    >
                        <td></td>
                        <td align="left" className="px-3 text-sm">
                            {collectionFromClient?.type}
                        </td>
                        <td align="left" className="px-3 text-sm">
                            {collectionFromClient?.dueDate}
                        </td>
                        <td
                            align="left"
                            className={`px-3 text-sm ${typesStatus.includes(collectionFromClient.status) ? 'text-green-400' : 'text-red-400'} `}
                        >
                            {collectionFromClient?.status}
                        </td>
                        <td align="left" className="px-3 text-sm">
                        </td>
                        <td align="left" className="px-3 text-sm">
                            {/* {collectionsFromClient?.amount} */}
                            {accounting.formatMoney(collectionFromClient.amount, '€')}
                        </td>
                        <td align="left" className="px-4 py-1 text-sm relative">
                            {/* Modal del menu de acciones */}
                            <ModalMenuActions item={collectionFromClient}>
                                <div className="px-4 py-2 text-sm text-white-0 border-b border-gray-700 uppercase" role="menuitem">
                                    collection
                                </div>
                                <div
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
                                    role="menuitem"
                                    onClick={() => handleOpenUpdateModal(collectionFromClient)}
                                >
                                    <Icon icon="dashicons:update-alt" width={20} />
                                    Update Collection
                                </div>
                                {
                                    auth.role === "admin" &&
                                    <div
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer transition-all duration-200 hover:text-red-500"
                                        role="menuitem"
                                        onClick={() => {
                                            removeItemFromList(
                                                "collectionsFromClients",
                                                collectionFromClient?._id,
                                                () => setForceRefresh(prev => prev + 1),
                                                collectionsFromClient
                                            )
                                        }}
                                    >
                                        <Icon icon="mdi:delete" width={20} />
                                        Delete Collection
                                    </div>
                                }
                            </ModalMenuActions>
                        </td>
                    </tr>
                ))
            }
        </>
    )
}