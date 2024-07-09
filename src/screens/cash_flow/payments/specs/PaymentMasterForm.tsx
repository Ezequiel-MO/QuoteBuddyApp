import React, { useEffect, useState, useRef } from 'react'
import { SubmitInput, ShowImagesButton } from '@components/atoms'
import { usePdfState } from "src/hooks"
import { AddPdfModal, ModalPdf } from "src/components/molecules"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { usePayment } from '../../context/PaymentsProvider'
import { PaymentFormFields } from "./PaymentFormFields"
import { Spinner } from '@components/atoms'
import { usePaymentSubmitForm } from "./helperPayment"
import { IPayment } from '@interfaces/payment'



export const PaymentMasterForm = () => {
    const { state } = usePayment()

    const fileInput = useRef<HTMLInputElement>(null)
    const { selectedFilesPdf, setSelectedFilesPdf, handleFilePdfSelection } = usePdfState()
    const [openAddPdfModal, setOpenAddPdfModal] = useState(false)
    const [openUpdatePdfModal, setOpenUpdatePdfModal] = useState(false)

    const { submitFrom, isLoading } = usePaymentSubmitForm(state.payment as IPayment)

    const vendorInvoice = state.vendorInvoice ?? {}
    const vendor: any = state.vendorInvoice?.vendor ?? {}

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const paymentData = { ...state.payment, vendorInvoiceId: state.vendorInvoice?._id }
        submitFrom(paymentData, [], state.payment?.update || false)
    }
    
    if (!state.vendorInvoice) {
        return null
    }

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen  justify-center items-center">
            <AddPdfModal
                fileInput={fileInput}
                handleFileSelection={handleFilePdfSelection}
                multipleCondition={false}
                open={openAddPdfModal}
                setOpen={setOpenAddPdfModal}
                selectedFiles={selectedFilesPdf}
                setSelectedFiles={setSelectedFilesPdf}
            />
            {/* <ModalPdf
                multipleCondition={false}
                open={openUpdatePdfModal}
                setOpen={setOpenUpdatePdfModal}
                keyModel='pdfInvoice'
                initialValues={state.vendorInvoice}
                nameScreen='vendorInvoices'
                screen={state.vendorInvoice || {}}
                submitForm={submitFromPDfUpdate}
            /> */}
            <h1 className='underline text-xl'>
                {
                    `Number invoice: ${vendorInvoice?.invoiceNumber}
                     - ${vendorInvoice?.vendorType}
                     - ${vendor.name || vendor.company.email}
                    `
                }
            </h1>
            <form className='space-y-2' onSubmit={handleSubmit}>
                <PaymentFormFields />
                <div className="flex justify-center items-center">
                    <SubmitInput update={false} title="Payment" />
                    <ShowImagesButton
                        name={true}
                        setOpen={!state.payment?.update ? setOpenAddPdfModal : setOpenUpdatePdfModal}
                        nameValue={!state.payment?.update ? "add pdf" : "show pdf"}
                    >
                        {
                            !state.payment?.update &&
                            <span>
                                {`${selectedFilesPdf?.length} files selected for upload`}
                            </span>
                        }
                    </ShowImagesButton>
                </div>
            </form>
        </div>
    )
}