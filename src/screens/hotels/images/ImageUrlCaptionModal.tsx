import React, { FC, useState } from 'react'
import { ModalComponent, ModalCancelButton } from 'src/components/atoms/'

interface ImageUrlCaptionModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    imageSrc: string | null
}

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '45%',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    border: '1px solid #333',
    boxShadow: 24,
    overflow: 'auto',
    padding: 5
}

export const ImageUrlCaptionModal: FC<ImageUrlCaptionModalProps> = ({ open, setOpen, imageSrc }) => {

    const [caption, setCaption] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCaption(e.target.value)
    }

    const handleClose = () => {
        setCaption('')
        setOpen(false)
    }

    return (
        <ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}>
            <ModalCancelButton handleClose={() => handleClose()} />
            <div className="p-4">
                <img
                    src={imageSrc ? imageSrc : "loading.."}
                    alt="Expanded thumbnail"
                    className="rounded-lg shadow-lg duration-300 scale-75 -mt-14"
                />
                <div className="flex flex-col items-center w-full">
                    <div className="w-full max-w-[550px]">
                        <label className="uppercase text-lg font-medium text-black-50 block text-left ml-1">
                            Caption
                        </label>
                        <textarea
                            name="caption"
                            rows={2}
                            value={caption}
                            onChange={handleChange}
                            maxLength={150}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className={`text-sm ${caption.length < 150 ? 'text-green-700' : 'text-red-600'}  text-gray-500 mt-1 block text-right`}>
                            {caption.length} / 150 max
                        </span>
                    </div>
                </div>
            </div>
        </ModalComponent>
    )
}