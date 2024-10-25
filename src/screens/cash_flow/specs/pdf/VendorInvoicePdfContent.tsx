import React, { useState, useEffect } from 'react'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { errorToastOptions, toastOptions } from 'src/helper/toast'
import { ThumbnailPDF } from "src/components/molecules/ThumbnailPDF"
import { usePayment } from "../../context/PaymentsProvider"

interface IVendorInvoicePdfContent {
    selectedFilesPdf: File[]
    setSelectedFilesPdf: React.Dispatch<React.SetStateAction<File[]>>
}

export const VendorInvoicePdfContent: React.FC<IVendorInvoicePdfContent> = ({ selectedFilesPdf, setSelectedFilesPdf }) => {
    const [loading, setLoading] = useState(false)

    const { state, dispatch, setForceRefresh } = usePayment()

    const handleImageUpload = async (file: File) => {
        setLoading(true)
        const formData = new FormData()
        formData.set("typeImage", "pdfInvoice")
        formData.append('pdfInvoice', file)
        try {
            let newImageUrls: string[] = []
            if (state.update && state.vendorInvoice?._id) {
                const response = await baseAPI.patch(
                    `vendorInvoices/pdfInvoice/${state.vendorInvoice._id}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                newImageUrls = response.data.data.data.pdfInvoice
                setForceRefresh(prev => prev + 1)
            } else {
                // en caso que es un create(post)
                const blobUrl = URL.createObjectURL(file)
                newImageUrls = !state.vendorInvoice?.pdfInvoice ? [blobUrl] : [...state.vendorInvoice.pdfInvoice, blobUrl]
                setSelectedFilesPdf(prev => [...prev, file])
            }
            dispatch({
                type: "UPDATE_VENDORINVOICE_FIELD",
                payload: {
                    name: "pdfInvoice",
                    value: newImageUrls
                }
            })
        } catch (error: any) {
            console.error('Image upload failed:', error)
            alert('Image upload failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }


    const handleImageDelete = async (urlPdf: string, index: number) => {
        if (!state.vendorInvoice?.pdfInvoice) {
            return
        }
        const loadingToast = toast.loading('Delete PDF, please wait')
        const data = { pdfUrl: urlPdf, keyDoc: "pdfInvoice" }
        try {
            if (state.update && state.vendorInvoice._id) {
                await baseAPI.delete(`vendorInvoices/pdfInvoice/${state.vendorInvoice._id}`, { data })
            }
            if (selectedFilesPdf.length > 0) { // en caso que es un create(post)
                const copySelectedFilesPdf = [...selectedFilesPdf].filter((_el, indexPdf) => indexPdf !== index)
                setSelectedFilesPdf(copySelectedFilesPdf)
            }
            const updatePdfUrls = [...state.vendorInvoice.pdfInvoice].filter(el => el !== urlPdf)
            toast.dismiss(loadingToast)
            dispatch({
                type: "UPDATE_VENDORINVOICE_FIELD",
                payload: {
                    name: "pdfInvoice",
                    value: updatePdfUrls
                }
            })
            toast.success('Deleted PDF successfully', toastOptions)
            setForceRefresh(prev => prev + 1)
        } catch (error: any) {
            toast.dismiss(loadingToast)
            console.error('Image deletion failed:', error)
            toast.error('Image deletion failed.', errorToastOptions)
        }
    }

    useEffect(() => {
        console.log(selectedFilesPdf)
    }, [selectedFilesPdf])


    return (
        <>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {
                    (state.vendorInvoice?.pdfInvoice || []).map((pdfSrc, index) => (
                        <ThumbnailPDF
                            imageSrc={pdfSrc}
                            onDelete={() => handleImageDelete(pdfSrc, index)}
                            onImageUpload={() => { }}
                            key={index}
                        />
                    ))
                }
                {(state.vendorInvoice?.pdfInvoice || []).length < 7 && (
                    <ThumbnailPDF onImageUpload={handleImageUpload} isLoading={loading} />
                )}
            </div>
        </>
    )
}