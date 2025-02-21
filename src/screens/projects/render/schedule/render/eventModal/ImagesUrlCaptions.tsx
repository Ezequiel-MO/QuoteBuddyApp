import { useState, useEffect, FC } from 'react'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../helper/toast'
import { Icon } from '@iconify/react'
import { useDragAndDrop } from "@formkit/drag-and-drop/react"
import { animations } from "@formkit/drag-and-drop"
import { IEvent, IRestaurant } from "src/interfaces"
import { IImage } from "src/interfaces/image"
import styles from "src/screens/projects/render/DayEvents.module.css"
import { ImageUrlCaptionModal } from 'src/components/atoms/modal/ImageUrlCaptionModal'


interface ImageUrlCaptionsProps {
    event: IEvent
    imagesEvent: IImage[]
    setImagesEvent: React.Dispatch<React.SetStateAction<IImage[]>>
}



export const ImageUrlCaptions: FC<ImageUrlCaptionsProps> = ({ event, imagesEvent, setImagesEvent }) => {
    const [change, setChange] = useState(false)

    const [eventIndex, setEventIndex] = useState<number | null>(null)

    const [openModal, setOpenModal] = useState(false)

    const [imageContentUrl, setImageUrlCaption] = useState<IImage>()

    // "parent" para el ref de "<ul>" , listImages y  setListImages es un "useState" de tipo array de IIMage => IImage[]
    const [parent, listImages, setListImages] = useDragAndDrop<HTMLUListElement, IImage>(
        [],
        {
            plugins: [animations()] // sirve para la animacion del drag and drop
        }
    )
    const [imageDrag, setImageDrag] = useState<string | null>(null)
    const [isDrag, setIsDrag] = useState(false)
    console

    useEffect(() => {
        if (event?.imageUrlCaptions) {
            setImagesEvent(event?.imageUrlCaptions)
            setListImages(event?.imageUrlCaptions)
        }
    }, [event])

    useEffect(() => {
        setImagesEvent(listImages)
    }, [listImages])

    const handleDragStart = (linkImage: string) => {
        setImageDrag(linkImage)
        setIsDrag(true)
    }
    const handleDragEnd = () => {
        setImageDrag(null)
        setIsDrag(false)
    }

    const handleDeleted = (index: number, id: string) => {
        let copy = [...imagesEvent]
        copy = copy.filter((el) => el._id !== id)
        setImagesEvent(copy)
        setListImages(copy)
        toast.success(`Image Removed number: ${index + 1}`, toastOptions)
    }

    const handleOpenImageUrlCaptionModal = (imageSrc: IImage) => {
        setOpenModal((prev) => !prev)
        setImageUrlCaption(imageSrc)
    }

    const handleCaptionSubmit = (updateImageUrlCaption: IImage) => {
        const copyImageUrlCaptions = [...imagesEvent]
        const findIndexImageUrlCaptions = copyImageUrlCaptions.findIndex(el => el._id === updateImageUrlCaption._id)
        if (findIndexImageUrlCaptions >= 0) {
            copyImageUrlCaptions[findIndexImageUrlCaptions] = updateImageUrlCaption
            setImagesEvent(copyImageUrlCaptions)
            setListImages(copyImageUrlCaptions)
            setOpenModal(false)
        }
    }

    if (!listImages) {
        return null
    }

    return (
        <div className="mt-6 mb-8">
            <ul
                className="flex flex-wrap p-0 list-none rounded-lg shadow-md shadow-gray-900"
                ref={parent}
            >
                {
                    listImages.map((el, index) => (
                        <li
                            key={el._id}
                            className={`relative  flex-grow-0 flex-shrink-0 min-w-0 p-2 w-1/3`}
                            draggable="true"
                            onDragStartCapture={(e) => handleDragStart(el.imageUrl)}
                            onDragEnd={(e) => handleDragEnd()}
                        >
                            <div className='relative'>
                                <abbr title="Double-click to add or edit the caption">
                                    <img
                                        src={el.imageUrl}
                                        key={el._id}
                                        className={`rounded-md  h-48 object-cover w-full ${styles.imagenDrag} ${imageDrag === el.imageUrl && isDrag ? `opacity-60  blur-sm scale-95` : ""}`}
                                        loading="lazy"
                                        onDoubleClick={(e) => {
                                            e.stopPropagation()
                                            handleOpenImageUrlCaptionModal(el)
                                        }}
                                    />
                                </abbr>
                                <div
                                    className={`${styles.deletedImagen} right-1 top-1 cursor-pointer`}

                                    onMouseOver={(event) => {
                                        setChange(true)
                                        setEventIndex(index)
                                    }}
                                    onMouseOut={(event) => {
                                        setChange(false)
                                        setEventIndex(null)
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleDeleted(index, el._id as string)
                                    }}
                                >
                                    {
                                        eventIndex !== index && !isDrag && (
                                            <span>
                                                <Icon icon="mdi:garbage" className={styles.iconGarbage} />
                                            </span>
                                        )
                                    }
                                    {
                                        change && eventIndex === index && (
                                            <span>
                                                <Icon
                                                    icon="mdi:garbage-can-empty"
                                                    className={styles.iconGarbage}
                                                />
                                            </span>
                                        )
                                    }
                                </div>
                                <ImageUrlCaptionModal
                                    open={openModal}
                                    setOpen={setOpenModal}
                                    imageUrlCaption={imageContentUrl as IImage}
                                    loading={false}
                                    captionSubmit={(value) => handleCaptionSubmit(value)}
                                />
                                {
                                    el.caption &&
                                    <span
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleOpenImageUrlCaptionModal(el)
                                        }}
                                        className="absolute bottom-1 left-1 hover:bg-cyan-500 hover:bg-opacity-80 text-white-0 rounded px-1 py-1 no-drag cursor-pointer"
                                    >
                                        <Icon icon="famicons:text-sharp" width={20} height={20} />
                                    </span>
                                }
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
