import { useState, FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ModalComponent } from '../../../../components/atoms/modal/Modal'
import {
    ModalCancelButton,
    ModalConfirmButton,
} from '../../../../components/atoms'
import { TableHeadModal } from "./TableHeadModal"
import { IEntertainmentPrice } from '../../../../interfaces'

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
    const [value, setValue] = useState<IEntertainmentPrice>({
        artistsFee: 0,
        aavv: 0,
        travelAllowance: 0,
        mealAllowance: 0,
    })

    if (!location.state) return null

    const { typeEvent, dayIndex, idRestaurant } = location.state

    const handleClose = () => {
        setValue({
            artistsFee: 0,
            aavv: 0,
            travelAllowance: 0,
            mealAllowance: 0,
        })
        setOpen(false)
    }

    return (
        <ModalComponent open={open} setOpen={() => handleClose()} styleModal={styleModal}>
            <ModalCancelButton handleClose={() => handleClose()} />
            <h1 className="text-center text-xl">
                Price Entertainment
            </h1>
            <TableHeadModal value={value} setValue={setValue} />
            <div className="flex justify-end mt-24">
                <ModalConfirmButton
                    handleConfirm={() => {
                        alert("save...")
                        console.log({ typeEvent, dayIndex, idRestaurant, value })
                    }}
                    text="Add Entertaiment"
                />
            </div>
        </ModalComponent>
    )
}