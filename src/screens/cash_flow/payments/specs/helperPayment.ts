import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { errorToastOptions, toastOptions } from 'src/helper/toast'
import baseAPI from 'src/axios/axiosConfig'
import { usePayment } from '../../context/PaymentsProvider'
import { IPayment } from "@interfaces/payment"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const mySwal = withReactContent(Swal)


const confirmSendPaymentAlert = async () => mySwal.fire({
    title: 'Send email!',
    text: "An email with the payment request will be sent to the payer.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'yes',
    cancelButtonText: `Cancel`,
    customClass: { container: 'custom-container' }
})

const confirmSendPaymentCompletedAlert = async (firstName: string, familyName: string) => mySwal.fire({
    title: 'Send email!',
    text: `Proof of payment will be sent to the account manager (${firstName} ${familyName} )`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'yes',
    cancelButtonText: `Cancel`,
    customClass: { container: 'custom-container' }
})

interface IPaymentValues extends IPayment {
    vendorInvoiceId: string
}

const PaymentFormData = {
    create: (values: IPaymentValues, files: File[] = []) => {
        const formData = new FormData()
        formData.set("amount", values.amount.toString())
        formData.set("paymentDate", values.paymentDate)
        formData.set("method", values.method as string)
        formData.set("status", values.status)
        formData.set("vendorInvoiceId", values.vendorInvoiceId)
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                console.log(files[i])
                formData.set("proofOfPaymentPDF", files[i])
            }
        }
        return formData
    },
    update: (values: IPaymentValues) => {
        const jsonData = {} as any
        jsonData.amount = values.amount
        jsonData.method = values.method
        jsonData.paymentDate = values.paymentDate
        jsonData.status = values.status
        jsonData.proofOfPaymentPDF = values.proofOfPaymentPDF
        return jsonData
    },
    updatePdfData: (values: any, files: File[] = []) => {
        const formData = new FormData()
        formData.set("typeImage", "proofOfPaymentPDF")
        if (values?.imageContentUrl.length > 0) {
            formData.append('imageUrls', values.imageContentUrl)
        }
        if (values?.deletedImage?.length > 0) {
            formData.append('deletedImage', values.deletedImage)
        }
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formData.set("proofOfPaymentPDF", files[i])
            }
        }
        return formData
    }
}




interface ReturnProps {
    submitFrom: (
        values: any,
        files: File[],
        endpoint: string,
        update: boolean
    ) => Promise<void>
    isLoading: boolean
}

export const usePaymentSubmitForm = (payment: IPayment): ReturnProps => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { dispatch, state } = usePayment()

    const submitFrom = async (
        values: any,
        files: File[],
        endpoint: string,
        update: boolean
    ) => {
        setIsLoading(true)
        const loadingToast = toast.loading("please wait!");
        const accountManager = state.vendorInvoice?.project?.accountManager[0]
        try {
            if (!update) {
                const isConfirmSendPaymentAlert = await confirmSendPaymentAlert()
                if (!isConfirmSendPaymentAlert.isConfirmed) {
                    return
                }
                const dataPost = PaymentFormData.create(values, files)
                const data = (await baseAPI.post("payments", dataPost)).data.data.data
                dispatch({
                    type: "ADD_PAYMENT_TO_VENDORINVOICE",
                    payload: {
                        payment: data
                    }
                })
            }
            if (update && endpoint === 'payments/pdf') {
                const isConfirmSendPaymentAlert = await confirmSendPaymentCompletedAlert(
                    accountManager?.firstName ?? "", accountManager?.familyName ?? ""
                )
                if (!isConfirmSendPaymentAlert.isConfirmed) {
                    return
                }
                const valuesUpdatePdf = PaymentFormData.updatePdfData(values, files)
                const dataPdf = (await baseAPI.patch(
                    `/payments/pdfPayment/${payment._id}`,
                    valuesUpdatePdf
                )).data.data.data
                const valuesUpdate = PaymentFormData.update(values)
                valuesUpdate.proofOfPaymentPDF = dataPdf.proofOfPaymentPDF
                valuesUpdate.vendorInvoice = state.vendorInvoice
                const data = (await baseAPI.patch(`/payments/${payment._id}`, valuesUpdate)).data.data.data
                dispatch({
                    type: "UPDATE_PAYMENT_TO_VENDORINVOICE",
                    payload: {
                        payment: data
                    }
                })
            }
            if (update && endpoint === "payments") {
                const dataUpdate = PaymentFormData.update(values)
                dataUpdate.vendorInvoice = state.vendorInvoice
                const data = (await baseAPI.patch(`/payments/${payment._id}`, dataUpdate)).data.data.data
                dispatch({
                    type: "UPDATE_PAYMENT_TO_VENDORINVOICE",
                    payload: {
                        payment: data
                    }
                })
            }
            //esto es para que se vea los cambios en el "VendorInvoice"
            await baseAPI.patch(`/vendorInvoices/${state.vendorInvoice?._id}`)
            toast.success(!update ? "Payment Created" : "Payment Update", toastOptions)
            setTimeout(() => {
                navigate("/app/cash_flow/payment")
            }, 800)
        } catch (error: any) {
            console.log(error)
            toast.error(
                `Error Creating/Updating Payment, ${error.response.data.message}`,
                errorToastOptions
            )
        } finally {
            toast.dismiss(loadingToast)
            setIsLoading(false)
        }
    }
    return { submitFrom, isLoading, }
}