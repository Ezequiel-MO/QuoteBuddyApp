import { useState, useEffect, FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ModalComponent } from '../../../../components/atoms/modal/Modal'
import {
    ModalCancelButton,
    ModalConfirmButton,
    Spinner
} from '../../../../components/atoms'

interface ModalPriceEntertainmentProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    overflowY: 'auto',
}

export const ModalPriceEntertainment: FC<ModalPriceEntertainmentProps> = ({ open, setOpen }) => {
    const location = useLocation()
    const navigate = useNavigate()

    if (!location.state) return null

    const {typeEvent,  dayIndex , idRestaurant} = location.state

    return (
        <ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}>
            <ModalCancelButton handleClose={() => console.log("closes")} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: "100px" }}>
                <ModalConfirmButton
                    handleConfirm={() =>
                        console.log({typeEvent , dayIndex , idRestaurant})
                    }
                    text="Add Entertaiment"
                />
            </div>
        </ModalComponent>
    )
}