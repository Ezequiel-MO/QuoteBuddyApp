import { useState, useEffect } from 'react'
import { ModalComponent } from '../../../../../components/atoms/modal/Modal'
import {
    ModalCancelButton,
    ModalConfirmButton,
    Spinner
} from '../../../../../components/atoms'
// import styles from '../../DayEvents.module.css'

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    overflowY: 'auto',
}

export const AddMeetingsImagesModal = ({ open, setOpen, hotel }) => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 800)
    }, [open])

    const handleModalClose = () => {
        setOpen(false)
    }

    const handleButtonClose = () => {
        setOpen(false)
    }


    if (loading) {
        return (
            <ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}>
                <div style={{ marginTop: '200px' }}>
                    <Spinner />
                </div>
            </ModalComponent>
        )
    }

    return (
        <ModalComponent open={open} setOpen={handleModalClose} styleModal={styleModal} >
            <ModalCancelButton handleClose={handleButtonClose} />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ModalConfirmButton
                    text="ADD MEETING/S"
                    // style={{ marginTop: 'auto', marginRight: "10px" }}
                />
            </div>
        </ModalComponent>
    )
}