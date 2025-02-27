import React, { useState } from 'react'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { errorToastOptions, toastOptions } from 'src/helper/toast'
import { ThumbnailPDF } from 'src/components/molecules/ThumbnailPDF'
import { useRestaurant } from '../context/RestaurantsContext'

interface IRestaurantPdfContentProps {
    selectedFilesPdf: File[]
    setSelectedFilesPdf: React.Dispatch<React.SetStateAction<File[]>>
}

export const RestaurantPdfContent: React.FC<IRestaurantPdfContentProps> = ({
    selectedFilesPdf,
    setSelectedFilesPdf
}) => {

    const [loading, setLoading] = useState(false)

    const { state, dispatch, setForceRefresh } = useRestaurant()

    const handlePdfUpload = async (file: File) => {
        setLoading(true)
        const loadingToast = toast.loading('please wait!')
        const formData = new FormData()
        formData.append('pdfMenus', file)
        try {
            let newPdfUrls: string[] = []
            if (state.update && state.currentRestaurant?._id) {
                const response = await baseAPI.patch(
                    `restaurants/pdfMenu/${state.currentRestaurant._id}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
                newPdfUrls = response.data.data.data.pdfMenus
                toast.success(`Image added successfully`, toastOptions)
            } else {
                // en caso que es un create(post)
                const blobUrl = URL.createObjectURL(file)
                newPdfUrls = !state.currentRestaurant?.pdfMenus
                    ? [blobUrl]
                    : [...state.currentRestaurant.pdfMenus, blobUrl]
                setSelectedFilesPdf((prev) => [...prev, file])
            }
            dispatch({
                type: 'UPDATE_RESTAURANT_FIELD',
                payload: {
                    name: 'pdfMenus',
                    value: newPdfUrls
                }
            })
        } catch (error: any) {
            console.error('Image upload failed:', error)
            alert('Pdf upload failed. Please try again.')
        } finally {
            toast.dismiss(loadingToast)
            setLoading(false)
        }
    }

    const handlePdfDelete = async (urlPdf: string, index: number) => {
        if (!state.currentRestaurant?.pdfMenus) {
            return
        }
        const loadingToast = toast.loading('Delete PDF, please wait')
        const data = { pdfUrl: urlPdf, keyDoc: 'pdfMenus' }
        try {
            if (state.update && state.currentRestaurant?._id) {
                await baseAPI.delete(`restaurants/pdfMenu/${state.currentRestaurant?._id}`, {
                    data
                })
            }
            if (selectedFilesPdf.length > 0) { // en caso que es un create(post) o si se agrega otro File
                const copySelectedFilesPdf = [...selectedFilesPdf].filter(
                    (_el, indexPdf) => indexPdf !== index
                )
                setSelectedFilesPdf(copySelectedFilesPdf)
            }
            const updatePdfUrls = [...state.currentRestaurant.pdfMenus].filter(
                (el) => el !== urlPdf
            )
            toast.dismiss(loadingToast)
            dispatch({
                type: 'UPDATE_RESTAURANT_FIELD',
                payload: {
                    name: 'pdfMenus',
                    value: updatePdfUrls
                }
            })
            await baseAPI.post(`admin/clearCache`)
            toast.success('Deleted PDF successfully', toastOptions)
        } catch (error: any) {
            toast.dismiss(loadingToast)
            console.error('pdf deletion failed:', error)
            toast.error('pdf deletion failed.', errorToastOptions)
        }
    }

    return (
        <>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {(state.currentRestaurant?.pdfMenus || []).map((pdfSrc, index) => (
                    <ThumbnailPDF
                        imageSrc={pdfSrc}
                        onDelete={() => handlePdfDelete(pdfSrc, index)}
                        // onImageUpload={() => {}}
                        key={index}
                    />
                ))}
                {(state.currentRestaurant?.pdfMenus || []).length < 1 && (
                    <ThumbnailPDF onImageUpload={handlePdfUpload} isLoading={loading} />
                )}
            </div>
        </>
    )
}