import { useState, FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ModalComponent } from '../../../../components/atoms/modal/Modal'
import {
    ModalCancelButton,
    ModalConfirmButton,
    Spinner
} from '../../../../components/atoms'
import { TableHeadModal } from "./TableHeadModal"
import { useCurrentProject } from '../../../../hooks'
import { IEntertainmentPrice, IEntertainment } from '../../../../interfaces'
import { toast } from 'react-toastify'
import { toastOptions , errorToastOptions } from '../../../../helper/toast'

interface ModalPriceEntertainmentProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    entertainmentShow: IEntertainment
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

export const ModalPriceEntertainment: FC<ModalPriceEntertainmentProps> = ({ open, setOpen, entertainmentShow }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { addEntertainmentInRestaurant } = useCurrentProject()
    const [value, setValue] = useState<IEntertainmentPrice>({
        artistsFee: 0,
        aavv: 0,
        travelAllowance: 0,
        mealAllowance: 0,
    })

    if (!location.state) return null

    const { typeMeal, dayIndex, idRestaurant } = location.state

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1200)
    }, [open])

    const handleClose = () => {
        setValue({
            artistsFee: 0,
            aavv: 0,
            travelAllowance: 0,
            mealAllowance: 0,
        })
        setOpen(false)
    }

    const handleConfirm = () => {
        setLoading(true)
        try {
            entertainmentShow.price = value
            addEntertainmentInRestaurant({
                dayIndex,
                typeMeal,
                idRestaurant,
                entertainmentShow
            })
            setOpen(false)
            toast.success( 'Entertainment Added to Schedule' , toastOptions)
            setTimeout(() => {
                navigate('/app/project/schedule')
            }, 600)
        } catch (err: any) {
            console.log(err)
            toast.error(err.message, errorToastOptions)
        } finally {
            setLoading(false)
        }
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
        <ModalComponent open={open} setOpen={() => handleClose()} styleModal={styleModal}>
            <ModalCancelButton handleClose={() => handleClose()} />
            <h1 className="text-center text-xl">
                Price Entertainment: {entertainmentShow.name}
            </h1>
            <TableHeadModal value={value} setValue={setValue} />
            <div className="flex justify-end mt-24">
                <ModalConfirmButton
                    handleConfirm={() => handleConfirm()}
                    text="Add Entertaiment"
                />
            </div>
        </ModalComponent>
    )
}