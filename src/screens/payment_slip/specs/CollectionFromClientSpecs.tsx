import { useState, FC } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import { Spinner } from '@components/atoms'
import { usePaymentSlip } from "../context/PaymentSlipContext"
import { CollectionFromClientMasterForm } from "./CollectionFromClientMasterForm"
import { ICollectionFromClient } from "src/interfaces"

interface CollectionFromClientSpecsProps {
    openModal: boolean
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const CollectionFromClientSpecs: FC<CollectionFromClientSpecsProps> = ({ openModal, setOpenModal }) => {
    const { dispatch, isUpdate , collectionFromClient } = usePaymentSlip()

    const [isLoading, setIsLoading] = useState(false)

    const submitForm = async (values: ICollectionFromClient) => {
        setIsLoading(true)
        const loadingToast = toast.loading("please wait!");
        try {
            if (!isUpdate) {
                const data = (await baseAPI.post("collectionsFromClients", values)).data.data.data
                toast.success('Collection From Client Created', toastOptions)
                dispatch({
                    type: "ADD_COLLECTION_FROM_CLIENT",
                    payload: {
                        addCollectionFromClient: data
                    }
                })
            }
            if (isUpdate && collectionFromClient) {
                const data = (await baseAPI.patch(`collectionsFromClients/${collectionFromClient._id}`, values)).data.data.data
                toast.success('Collection From Client Updated', toastOptions)
                dispatch({
                    type: "UPDATE_COLLECTION_FROM_CLIENT",
                    payload: {
                        updatedCollectionFromClient: data
                    }
                })
            }
            setTimeout(() => {
                setOpenModal(false)
            }, 1000)
        } catch (error: any) {
            console.log(error)
            toast.error(
                `Error Creating/Updating Collection From Client, ${error.response.data.message}`,
                errorToastOptions
            )
        } finally {
            toast.dismiss(loadingToast)
            setIsLoading(false)
        }
    }


    return (
        <>
            {
                isLoading ?
                    <Spinner />
                    :
                    <CollectionFromClientMasterForm submitForm={submitForm} />
            }
        </>
    )
}