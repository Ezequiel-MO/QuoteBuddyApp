import React, { FC, useEffect, useState } from 'react'
import { ModalComponent, ModalCancelButton } from 'src/components/atoms/'
import { IImage } from 'src/interfaces/image'
import { Button, Spinner } from 'src/components/atoms'


interface ImageUrlCaptionModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    imageUrlCaption: IImage
    captionSubmit: (imageUrlCaption: IImage) => void
    loading: boolean
}

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    border: '1px solid #333',
    boxShadow: 24,
    overflow: 'auto',
    padding: 5
}

export const ImageUrlCaptionModal: FC<ImageUrlCaptionModalProps> = ({
    open,
    setOpen,
    imageUrlCaption,
    captionSubmit,
    loading
}) => {

    const [imageUrlCaptionState, setImageUrlCaptionState] = useState<IImage>({ imageUrl: '', caption: '' })
    const [loadingModal, setLoadingModal] = useState(false)

    useEffect(() => {
        setLoadingModal(true)
        setImageUrlCaptionState(imageUrlCaption)
        setTimeout(() => {
            setLoadingModal(false)
        }, 1200)
    }, [imageUrlCaption, open])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setImageUrlCaptionState(prev => ({
            ...prev,
            caption: e.target.value
        }))
    }

    const handleClose = () => {
        setImageUrlCaptionState({
            imageUrl: '',
            caption: ''
        })
        setOpen(false)
    }

    if (loadingModal) {
        return (
            <ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}>
                <ModalCancelButton handleClose={() => handleClose()} />
                <div className="p-4">
                    <Spinner />
                </div>
            </ModalComponent>
        )
    }

    return (
        <ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}>
            <ModalCancelButton handleClose={() => handleClose()} />
            <div className="p-4">
                <div className="flex justify-center">
                    <img
                        src={imageUrlCaptionState?.imageUrl ? imageUrlCaptionState?.imageUrl : "loading.."}
                        alt="Expanded thumbnail"
                        className="rounded-lg shadow-lg duration-300 max-w-[500px] max-h-[400px] min-w-[100px] object-contain"
                    />
                </div>
                <div className="flex flex-col items-center w-full mt-12">
                    <div className="w-full max-w-[550px]">
                        <label className="uppercase text-lg font-medium text-black-50 block text-left ml-1 ">
                            Caption
                        </label>
                        <textarea
                            name="caption"
                            rows={2}
                            placeholder='Add caption…'
                            value={imageUrlCaptionState?.caption}
                            onChange={handleChange}
                            maxLength={150}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className={`text-sm ${imageUrlCaptionState?.caption?.length < 150 ? 'text-green-700' : 'text-red-600'}  text-gray-500 mt-1 block text-right`}>
                            {imageUrlCaptionState?.caption?.length} / 150 max
                        </span>
                    </div>
                    <Button
                        icon={loading ? 'eos-icons:bubble-loading' : ''}
                        widthIcon={25}
                        disabled={loading ? true : false}
                        handleClick={() => captionSubmit(imageUrlCaptionState)}
                    >
                        {!loading ? "add caption" : "loading..."}
                    </Button>
                </div>
            </div>
        </ModalComponent>
    )
}