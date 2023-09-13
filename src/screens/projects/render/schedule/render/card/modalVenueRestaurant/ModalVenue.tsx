import { useState, useEffect, FC } from 'react'
import { ModalComponent } from '../../../../../../../components/atoms/modal/Modal'
import {
    ModalCancelButton,
    ModalConfirmButton,
    Spinner
} from '../../../../../../../components/atoms'
import { TableHeadModal } from "./TableHeadModal"
import { IVenuePrice } from "../../../../../../../interfaces"

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

export const ModalVenue: FC<any> = ({ open, setOpen, restaurant }) => {
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState<IVenuePrice>({})

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 800)
    }, [open])

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
        <ModalComponent open={open} setOpen={setOpen} styleModal={styleModal}>
            <ModalCancelButton handleClose={() => setOpen(false)} />
            <h1 style={{ textAlign: "center", fontSize: "20px" }}>
                {restaurant.name}
            </h1>
            <div style={{ marginTop: "50px" }}>
                <TableHeadModal value={value} setValue={setValue} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: "100px" }}>
                <ModalConfirmButton
                    handleConfirm={() => {
                        alert("save")
                        console.log(value)
                    }}
                    text="Save Venue"
                />
            </div>
        </ModalComponent>
    )
}
