import { useState, useEffect } from 'react'
import { ModalComponent } from '../../../../../../components/atoms/modal/Modal'
import {
    ModalCancelButton,
    ModalConfirmButton,
    Spinner
} from '../../../../../../components/atoms'
import { IntroModalContent } from "./IntroModalContent"

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2
}

export const IntroModal = ({ open, setOpen, day, event }) => {
    const [loading, setLoading] = useState(Boolean())
    const [textContent, setTextContent] = useState()


    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 800)
    }, [open])

    const modalClose = () =>{
        setTextContent()
        setOpen(false)
    }

    const handleClose = () =>{
        setTextContent()
        setOpen(false)
    }



    if (loading) {
        return (
            <ModalComponent open={open} setOpen={modalClose} styleModal={styleModal}>
                <div style={{ marginTop: '200px' }}>
                    <Spinner />
                </div>
            </ModalComponent>
        )
    }

    return (
        <ModalComponent open={open} setOpen={modalClose} styleModal={styleModal} >
            <ModalCancelButton handleClose={handleClose} />
            <IntroModalContent
                day={day} 
                event={event} 
                textContent={textContent} 
                setTextContent={setTextContent} 
            />
            <ModalConfirmButton handleConfirm={() => alert("Save...")} />
        </ModalComponent>
    )

}