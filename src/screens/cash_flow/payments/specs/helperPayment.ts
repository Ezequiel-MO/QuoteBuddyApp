import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { errorToastOptions, toastOptions } from 'src/helper/toast'
import baseAPI from 'src/axios/axiosConfig'
import { usePayment } from '../../context/PaymentsProvider'
import { IPayment } from "@interfaces/payment"


interface ReturnProps {
    submitFrom: (
        values: any,
        files: File[],
        // endpoint: string,
        update: boolean
    ) => Promise<void>
    isLoading: boolean
}

export const usePaymentSubmitForm = (payment: IPayment): ReturnProps => {
    const navigate = useNavigate()//////
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { state, dispatch } = usePayment()

    const submitFrom = async (
        values: any,
        files: File[],
        update: boolean
    ) => {
        setIsLoading(true)
        const loadingToast = toast.loading("please wait!");
        try {
            if (!update) {
                const data = (await baseAPI.post("payments", values)).data.data.data
                dispatch({
                    type: "ADD_PAYMENT_TO_VENDORINVOICE",
                    payload: {
                        payment: data
                    }
                })
                toast.success('Payment Created', toastOptions)
            }
            setTimeout(() => {
                navigate("/app/cash_flow/payment")
            }, 800)
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
    return { submitFrom, isLoading, }
}