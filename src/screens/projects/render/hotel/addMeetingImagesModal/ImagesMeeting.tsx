import { FC } from 'react'
import { Icon } from '@iconify/react'
import { handleUploadImages, handleDeletedImage } from "./handlesMeetingImages"

interface ImagePreviewUrl {
    url: string;
    name: string;
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

export const ImagesMeeting:FC<ImagesMeetingProps> = ({ 
    fileInput,
    imagePreviewUrls,
    filesImages,
    deletedImage,
    setImagePreviewUrls,
    setFilesImages,
    setDeletedImage
}) => {


    return (
        <div>
            <div className="flex space-x-4">
                {imagePreviewUrls.map((imageUrl, index) =>
                    <div key={index} className="relative">
                        <span
                            onClick={(e) => handleDeletedImage({
                                e,
                                imagenUrl:imageUrl,
                                deletedImage,
                                filesImages,
                                imagePreviewUrls,
                                setDeletedImage,
                                setFilesImages,
                                setImagePreviewUrls
                            })}
                        >
                            <Icon icon="mdi:garbage" className="absolute text-white top-0 left-0 cursor-pointer" style={{ color: "red", fontSize: "30px", marginTop: "5px" }} />
                        </span>
                        <div className='my-1 mr-1 bg-gray-300 rounded-lg shadow-md   border border-transparent '>
                            <img key={index} src={imageUrl?.url ?? imageUrl} className="object-cover object-center rounded-lg h-56 w-52" loading="lazy" />
                        </div>
                    </div>
                )}
            </div>
            <input
                type="file"
                style={{ marginTop: "10px", color: "transparent" }}
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
                disabled={imagePreviewUrls.length >= 4}
            />
        </div>
    )
}