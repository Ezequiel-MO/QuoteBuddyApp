import { toast } from 'react-toastify'
import baseAPI from "../../../../../axios/axiosConfig"
import { errorToastOptions, toastOptions } from '../../../../../helper/toast'
import { IHotel } from "src/interfaces"
import { IImage } from "src/interfaces/image"
import { errorSweetalert } from 'src/components/atoms/sweetalert/ErrorSweetalert'


interface ImagePreviewUrl {
    url: string;
    name: string;
    _id?: string;
    caption?: string
}
interface ImagesFormDataParams {
    imagePreviewUrls: ImagePreviewUrl[];
    filesImages: File[];
    deletedImage: string[];
}


export const imagesFormData = ({
    imagePreviewUrls,
    filesImages,
    deletedImage
}: ImagesFormDataParams) => {
    const imageUrls = imagePreviewUrls.map((el) => {
        if (el?.url.includes("amazon")) {
            return {
                caption: el.caption,
                _id: el._id,
                imageUrl: el.url
            }
        }
    }).filter(el => el)
    const formData = new FormData()
    if (filesImages.length > 0) {
        const captions = imagePreviewUrls.filter(el => !el.url.includes("amazon")).map(el => el.caption)
        for (let i = 0; i < filesImages.length; i++) {
            const extension = filesImages[i].name.slice(filesImages[i].name.lastIndexOf('.'))
            const updateFile = new File(
                [filesImages[i]],
                captions[i] ? `${captions[i]}${extension}` : `image${extension}`,
                { type: 'image/jpeg' }
            )
            formData.append("meetingImageContentUrl", updateFile)
        }
    }
    if (imageUrls.length > 0) {
        formData.append("imageUrls", JSON.stringify(imageUrls))
    }
    if (deletedImage.length > 0) {
        formData.append('deletedImage', JSON.stringify(deletedImage))
    }
    return formData
}


interface IHotelModal {
    pricesEdit?: any
    textContentEdit?: string
    imageContentUrlEdit?: string[]
    meetingImageContentUrl?: string[]
    meetingDetails?: any
    dayIndex?: number
    id?: string
    meetingImageUrlCaptionsEdit?: IImage[]
}
interface HandleSubmitParams {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    formData: FormData
    hotel: IHotel
    meetingDetails: any // 
    textContent: string
    dayIndex?: number
    editModalHotel: (data: IHotelModal) => void
    editModalHotelOvernight: (data: IHotelModal) => void
}


export const handleSubmit = async ({
    setLoading,
    setOpen,
    formData,
    hotel,
    meetingDetails,
    textContent,
    dayIndex,
    editModalHotel,
    editModalHotelOvernight
}: HandleSubmitParams) => {
    setLoading(true)
    try {
        const resultHotel = (await baseAPI.patch(`hotels/meetingImages/${hotel._id}`, formData)).data
        const jsonData: Partial<IHotel> = { ...resultHotel.data.data }
        jsonData.meetingDetails = {
            ...meetingDetails,
            generalComments: textContent
        }
        console.log(resultHotel.data.data)
        await baseAPI.patch(`hotels/${hotel._id}`, jsonData)
        if (resultHotel.status === "success") {
            const meetingImageContentUrl = resultHotel.data.data?.meetingImageContentUrl
            editModalHotel({
                id: hotel._id,
                meetingDetails: { ...meetingDetails, generalComments: textContent },
                meetingImageContentUrl,
                meetingImageUrlCaptionsEdit: resultHotel.data.data?.meetingImageUrlCaptions
            })
            if (dayIndex !== undefined) {
                editModalHotelOvernight({
                    id: hotel._id,
                    meetingDetails: { ...meetingDetails, generalComments: textContent },
                    meetingImageContentUrl,
                    dayIndex: dayIndex
                })
            }
            toast.success("Save", toastOptions)
            setOpen(false)
        }
    } catch (err: any) {
        console.log(err)
        toast.error(err.message, errorToastOptions)
    } finally {
        setLoading(false)
    }
}


interface HandleUploadImagesParams {
    imagePreviewUrls: ImagePreviewUrl[];
    fileInput: React.RefObject<HTMLInputElement>;
    filesImages: File[];
    setImagePreviewUrls: React.Dispatch<React.SetStateAction<ImagePreviewUrl[]>>;
    setFilesImages: React.Dispatch<React.SetStateAction<File[]>>;
    maxFiles?: number
}

export const handleUploadImages = ({
    imagePreviewUrls,
    fileInput,
    filesImages,
    setImagePreviewUrls,
    setFilesImages,
    maxFiles = 4
}: HandleUploadImagesParams) => {
    if (fileInput.current?.files && (fileInput.current?.files?.length + imagePreviewUrls.length > maxFiles)) {
        return errorSweetalert(
            'Error, Maximum four images',
            `You exceeded the maximum number of images allowed!`
        )
    }
    let files: File[] = []
    if (fileInput.current?.files) {
        files = Array.from(fileInput?.current?.files) // Convierte "files" en un array "[...fileInput.current.files] con spread operator tambien funciona"
    }
    const imageUrls = files.map(file => {
        return {
            url: URL.createObjectURL(file), // Crea URLs para cada archivo , va servir para renderizar lo que se sube
            name: file.name,  // nombre real de la imagen , lo guardo para eleminarla del estado "filesImages"
            _id: URL.createObjectURL(file), //
            caption: ''
        }
    })
    setImagePreviewUrls([...imagePreviewUrls, ...imageUrls]) // Almacena las URLs en el estado
    if (fileInput.current?.files) {
        setFilesImages([...filesImages, ...fileInput?.current?.files])
    }
}


interface HandleDeletedImageParams {
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
    imagenUrl: ImagePreviewUrl
    imagePreviewUrls: ImagePreviewUrl[]
    filesImages: File[]
    deletedImage: string[]
    setImagePreviewUrls: React.Dispatch<React.SetStateAction<ImagePreviewUrl[]>>
    setFilesImages: React.Dispatch<React.SetStateAction<File[]>>
    setDeletedImage: React.Dispatch<React.SetStateAction<string[]>>
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
}: HandleDeletedImageParams) => {
    const newImageUrls = imagePreviewUrls.filter(el => el.url !== imagenUrl.url)
    const newFilesImages = filesImages.filter(el => el.name !== imagenUrl.name)
    setImagePreviewUrls(newImageUrls)
    setFilesImages(newFilesImages)
    //si es una imagen de amazon web service lo mando al estado "deletedImage"
    if (imagenUrl?.url.includes("amazonaws")) {
        setDeletedImage([...deletedImage, imagenUrl?.url])
    }
}
