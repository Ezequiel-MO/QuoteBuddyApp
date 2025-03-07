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
    const isMaxFilesReached = imagePreviewUrls.length >= maxFiles

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
            <div className="flex flex-wrap space-x-4 items-start">
                {imagePreviewUrls.map((imageUrl, index) =>
                    <div key={index} className="relative">
                        <div className=' mx-1 my-2 rounded-lg shadow-md   border border-transparent '>
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
                <div
                    className={`relative w-52  h-56 mx-1 my-2 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center hover:border-orange-500 transition-colors duration-200 cursor-pointer ${isMaxFilesReached && 'hidden'}`}
                    onClick={() => fileInput.current?.click()} // toma como referencia fileInput que esta en el input
                >
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
                        disabled={isMaxFilesReached}
                    />
                    <label
                        className="cursor-pointer flex flex-col items-center"
                    >
                        <svg
                            className="w-12 h-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16v4h16v-4M16 8l-4 4m0 0l-4-4m4 4V4"
                            ></path>
                        </svg>
                        <span className="mt-2 text-sm">Click Upload</span>
                    </label>
                </div>
            </div>
        </div>
    )
}