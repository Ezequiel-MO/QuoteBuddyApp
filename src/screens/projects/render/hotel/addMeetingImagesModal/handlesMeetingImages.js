import { toast } from 'react-toastify'
import baseAPI from "../../../../../axios/axiosConfig"
import { errorToastOptions, toastOptions } from '../../../../../helper/toast'


export const imagesFormData = ({ imagePreviewUrls, filesImages, deletedImage }) => {
    const imageUrls = imagePreviewUrls.map((el) => {
        if (el?.url.includes("amazon")) {
            return el.url
        }
    }).filter(el => el)
    const formData = new FormData()
    formData.append("typeImage", "meetingImageContentUrl")
    if (filesImages.length > 0) {
        for (let i = 0; i < filesImages.length; i++) {
            formData.append("meetingImageContentUrl", filesImages[i])
        }
    }
    if (imageUrls.length > 0) {
        formData.append("imageUrls", imageUrls)
    }
    if (deletedImage.length > 0) {
        formData.append('deletedImage', deletedImage)
    }
    return formData
}


export const handleSubmit = async ({
    setLoading,
    setOpen,
    formData,
    hotel,
    meetingDetails,
    textContent,
    editModalHotel
}) => {
    setLoading(true)
    try {
        const resultHotel = (await baseAPI.patch(`hotels/meetingImages/${hotel._id}`, formData)).data
        const jsonData = {}
        jsonData.meetingDetails = {
            ...meetingDetails,
            generalComments:textContent
        }
        await baseAPI.patch(`hotels/${hotel._id}`,jsonData)
        if (resultHotel.status === "success") {
            const meetingImageContentUrl = resultHotel.data.data?.meetingImageContentUrl
            editModalHotel({
                id: hotel._id,
                meetingDetails: { ...meetingDetails, generalComments: textContent },
                meetingImageContentUrl,
            })
            toast.success("Save", toastOptions)
            setOpen(false)
        }
    } catch (err) {
        console.log(err)
        toast.error(err.message, errorToastOptions)
    } finally {
        setLoading(false)
    }
}


export const handleUploadImages = ({
    imagePreviewUrls,
    fileInput,
    filesImages,
    setImagePreviewUrls,
    setFilesImages
}) => {
    if (imagePreviewUrls.length >= 4) {
        alert("Maximum four images")
        return
    }
    const files = Array.from(fileInput.current.files) // Convierte FileList en un array "[...fileInput.current.files] con spread operator tambien funciona"
    const imageUrls = files.map(file => {
        return {
            url: URL.createObjectURL(file), // Crea URLs para cada archivo , va servir para renderizar lo que se sube
            name: file.name  // nombre real de la imagen , lo guardo para eleminarla del estado "filesImages"
        }
    })
    setImagePreviewUrls([...imagePreviewUrls, ...imageUrls]) // Almacena las URLs en el estado
    setFilesImages([...filesImages, ...fileInput.current.files])
}


export const handleDeletedImage = ({
    e,
    imagenUrl,
    imagePreviewUrls,
    filesImages,
    deletedImage,
    setImagePreviewUrls,
    setFilesImages,
    setDeletedImage
}) => {
    const newImageUrls = imagePreviewUrls.filter(el => el.url !== imagenUrl.url)
    const newFilesImages = filesImages.filter(el => el.name !== imagenUrl.name)
    setImagePreviewUrls(newImageUrls)
    setFilesImages(newFilesImages)
    //si es una imagen de amazon web service lo mando al estado "deletedImage"
    if (imagenUrl?.url.includes("amazonaws")) {
        setDeletedImage([...deletedImage, imagenUrl?.url])
    }
}
