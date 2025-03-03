import { FC, useState } from 'react'
import { Icon } from '@iconify/react'
import { handleUploadImages, handleDeletedImage } from "./handlesMeetingImages"
import { ImageUrlCaptionModal } from 'src/components/atoms/modal/ImageUrlCaptionModal'
import { IImage } from "src/interfaces/image"


interface ImagePreviewUrl {
    url: string;
    name: string;
    _id?: string;
    caption?: string
}

interface ImagesMeetingProps {
    fileInput: React.MutableRefObject<HTMLInputElement | null>;
    imagePreviewUrls: ImagePreviewUrl[];
    filesImages: File[];
    deletedImage: string[];
    setImagePreviewUrls: React.Dispatch<React.SetStateAction<ImagePreviewUrl[]>>;
    setFilesImages: React.Dispatch<React.SetStateAction<File[]>>;
    setDeletedImage: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ImagesMeeting: FC<ImagesMeetingProps> = ({
    fileInput,
    imagePreviewUrls,
    filesImages,
    deletedImage,
    setImagePreviewUrls,
    setFilesImages,
    setDeletedImage
}) => {

    const [openModal, setOpenModal] = useState(false)

    const [imageContentUrl, setImageUrlCaption] = useState<IImage>()

    const maxFiles = 4

    const handleOpenImageUrlCaptionModal = (imageSrc: ImagePreviewUrl) => {
        setOpenModal((prev) => !prev)
        const { url, caption, _id } = imageSrc
        const imageUrlCaption: IImage = { imageUrl: url, caption: caption as string, _id }
        setImageUrlCaption(imageUrlCaption)
    }

    const handleCaptionSubmit = (updateImageUrlCaption: IImage) => {
        const { _id, caption, imageUrl } = updateImageUrlCaption
        const updateImagePreviewUrl: ImagePreviewUrl = {
            _id: _id ? _id : imageUrl,
            caption: caption ? caption : '',
            url: imageUrl,
            name: imageUrl
        }
        const copyImageUrlCaptions = [...imagePreviewUrls]
        const findIndexImageUrlCaptions = copyImageUrlCaptions.findIndex(el => el._id === updateImageUrlCaption._id)
        if (findIndexImageUrlCaptions >= 0) {
            copyImageUrlCaptions[findIndexImageUrlCaptions] = updateImagePreviewUrl
            setImagePreviewUrls(copyImageUrlCaptions)
            setOpenModal(false)
        }
    }


    return (
        <div>
            <div className="flex space-x-4">
                {imagePreviewUrls.map((imageUrl, index) =>
                    <div key={index} className="relative">
                        <div className='my-1 mr-1 rounded-lg shadow-md   border border-transparent '>
                            <abbr title="click to add or edit the caption">
                                <img
                                    key={index}
                                    src={imageUrl?.url ?? imageUrl}
                                    className="object-cover object-center rounded-lg h-56 w-52 active:scale-95"
                                    loading="lazy"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleOpenImageUrlCaptionModal(imageUrl)
                                    }}
                                />
                            </abbr>
                        </div>
                        <span
                            onClick={(e) => handleDeletedImage({
                                e,
                                imagenUrl: imageUrl,
                                deletedImage,
                                filesImages,
                                imagePreviewUrls,
                                setDeletedImage,
                                setFilesImages,
                                setImagePreviewUrls
                            })}
                        >
                            <Icon
                                icon="mdi:garbage"
                                className="absolute text-white top-0 left-0 cursor-pointer mt-3 ml-2 text-red-600"
                                width={30}
                            />
                        </span>
                        <ImageUrlCaptionModal
                            open={openModal}
                            setOpen={setOpenModal}
                            imageUrlCaption={imageContentUrl as IImage}
                            loading={false}
                            captionSubmit={(value) => handleCaptionSubmit(value)}
                        />
                        {

                            imageUrl.caption &&
                            <span
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleOpenImageUrlCaptionModal(imageUrl)
                                }}
                                className="absolute bottom-1 left-1 hover:bg-cyan-500 hover:bg-opacity-80 text-white-0 rounded px-1 py-1 no-drag cursor-pointer"
                            >
                                <Icon icon="famicons:text-sharp" width={20} height={20} />
                            </span>
                        }
                    </div>
                )}
            </div>
            <input
                type="file"
                className="hidden" // Oculta el input
                ref={fileInput}
                accept="image/jpeg, image/png"
                onChange={() => handleUploadImages({
                    fileInput,
                    filesImages,
                    imagePreviewUrls,
                    setFilesImages,
                    setImagePreviewUrls
                })}
                multiple={true}
                disabled={imagePreviewUrls.length >=  maxFiles}
            />
            <button
                className={`bg-blue-500  text-white-0 px-4 py-1 rounded-lg cursor-pointer active:scale-90 mt-2 hover:bg-blue-700 ${imagePreviewUrls.length >=  maxFiles && 'hidden'}`}
                type="button"
                onClick={() => fileInput.current?.click()} // Hace clic en el input oculto
                disabled={imagePreviewUrls.length >= maxFiles}
            >
                Add Image/s
            </button>
            {/* <button
                className='bg-emerald-500 px-2 py-1 rounded-lg active:scale-90'
                type='button'
                onClick={() => console.log({ imagePreviewUrls, deletedImage })}
            >
                consola
            </button> */}
        </div>
    )
}