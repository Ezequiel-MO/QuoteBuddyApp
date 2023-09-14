import { useState, useEffect, FC } from 'react'
import { ModalComponent } from '../../../../../../../components/atoms/modal/Modal'
import {
    ModalCancelButton,
    ModalConfirmButton,
    Spinner
} from '../../../../../../../components/atoms'
import { TableHeadModal } from "./TableHeadModal"
import { IVenuePrice } from "../../../../../../../interfaces"
import {
    useCurrentProject,
    useSweetAlertConfirmationDialog,
    useSweetAlertCloseDialog,
    useModalValidation
} from "../../../../../../../hooks"
import { IRestaurant } from "../../../../../../../interfaces"
import { toast } from 'react-toastify'
import { errorToastOptions } from '../../../../../../../helper/toast'

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

interface ModalVenueProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    restaurant: IRestaurant
    typeMeal: string
    dayIndex: number
    setChange: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalVenue: FC<ModalVenueProps> = ({ open, setOpen, restaurant, typeMeal, dayIndex, setChange }) => {
    const { addOrEditVenue } = useCurrentProject()
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState<IVenuePrice>({})
    const [isChecked, setIsChecked] = useState({})

    useEffect(() => {
        setLoading(true)
        const isVenue = Object.values(restaurant?.venue_price || {}).length > 0
        if (isVenue && restaurant.venue_price) {
            setValue(restaurant.venue_price)
        }
        setTimeout(() => {
            setLoading(false)
        }, 800)
    }, [open])


    const onSuccess = async () => {
        addOrEditVenue({
            typeMeal: typeMeal,
            dayIndex: dayIndex,
            idRestaurant: restaurant._id,
            venueEdit: value
        })
        setTimeout(() => {
            setOpen(false)
            setChange(false)
        }, 300)
    }
    const onError = (error: any) => {
        toast.error(error, errorToastOptions)
    }

    const { handleConfirm } = useSweetAlertConfirmationDialog({
        onSuccess,
        onError
    })

    const handleCloseModal = () => {
        setOpen(false)
        setChange(false)
    }

    const { validate } = useModalValidation({
        isChecked
    })

    const setClosed = () => {
        setOpen(false)
        setChange(false)
    }
    const { handleClose } = useSweetAlertCloseDialog({
        validate: validate,
        setOpen: setClosed
    })


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
        <ModalComponent open={open} setOpen={handleCloseModal} styleModal={styleModal}>
            <ModalCancelButton
                handleClose={() => handleClose()} />
            <h1 style={{ textAlign: "center", fontSize: "20px" }}>
                {restaurant.name}
            </h1>
            <div style={{ marginTop: "50px" }}>
                <TableHeadModal
                    value={value}
                    setValue={setValue}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                    restaurant={restaurant}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: "100px" }}>
                <ModalConfirmButton
                    handleConfirm={() => {
                        handleConfirm()
                    }}
                    text="Save Venue"
                />
            </div>
        </ModalComponent>
    )
}
