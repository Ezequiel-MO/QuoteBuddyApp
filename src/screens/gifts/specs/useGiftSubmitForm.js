import { useState } from 'react'
import baseAPI from '../../../axios/axiosConfig'
import { GiftFormData } from "./GiftFormData"
import { toast } from 'react-toastify'
import { errorToastOptions } from '../../../helper/toast'

const typeImage = {
    imageContentUrl: "imageContentUrl",
    imageUrls: "imageUrls"
}

export const useGiftForm = ({ onSuccess, onError, gift }) => {
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (values, files, endpoint, update) => {
        setIsLoading(true)
        try {
            if (!update) {
                const dataPost = GiftFormData.create(values, files)
                const allImageContentUrl = dataPost.getAll(typeImage.imageContentUrl)
                if(!allImageContentUrl.length){
                    return toast.error("please upload an image" , errorToastOptions)
                }
                await baseAPI.post("gifts", dataPost)
            }
            if (update) {
                const dataUpdate = GiftFormData.update(values)
                await baseAPI.patch(`gifts/${gift._id}`, dataUpdate)
            }
            if (endpoint === 'gifts/image') {
                const imagesUpdate = GiftFormData.updateImageData(values, files)
                const allImageContentUrl = imagesUpdate.getAll(typeImage.imageContentUrl)
                const allImageUrls = imagesUpdate.getAll(typeImage.imageUrls)
                if (!allImageContentUrl.length && !allImageUrls.length) {
                    return toast.error(
                        "Please, add a new image before doing the update",
                        errorToastOptions
                    )
                }
                if (allImageUrls.length > 0 && allImageContentUrl.length > 0) {
                    return toast.error(
                        `Please delete existing images before uploading new ones`,
                        errorToastOptions
                    )
                }
                await baseAPI.patch(`gifts/images/${gift._id}`, imagesUpdate)
            }
            onSuccess(update)
        } catch (error) {
            onError(error)
        } finally {
            setIsLoading(false)
        }
    }
    return { handleSubmit, isLoading }
}