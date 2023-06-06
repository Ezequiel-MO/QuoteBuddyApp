import { useState, useEffect } from 'react'
import { ModalComponent } from '../../../../../../components/atoms/modal/Modal'
import {
    ModalCancelButton,
    ModalConfirmButton,
    Spinner
} from '../../../../../../components/atoms'
import { EventModalContent } from "./EventModalContent"
import { 
    useCurrentProject,
    useSweetAlertConfirmationDialog 
} from '../../../../../../hooks'

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
    p: 2
}

export const EventModal = ({ open, setOpen, event = {}, index , dayIndex , typeOfEvent }) => {
    const {editModalEventAndRestaurant} = useCurrentProject()
    const [loading, setLoading] = useState(Boolean())
    const [imagesEvent, setImagesEvent] = useState([])
    const [textContent, setTextContent] = useState()
    const [data, setData] = useState({})
    const [isChecked, setIsChecked] = useState()

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 800)
    }, [open])

    const onSuccess = async () => {
        editModalEventAndRestaurant({
            id:event._id,
            dayIndex,
            typeOfEvent,
            data,
            imagesEvent,
            textContent
        })
		setTimeout(() => {
			setOpen(false)
		}, 1000)
	}

    const onError = (error) => {
		toast.error(error, errorToastOptions)
	}

    const {handleConfirm} = useSweetAlertConfirmationDialog({
        onSuccess,
        onError
    })

    
   

    
    if (Object.keys(event).length === 0) {
        return null
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
        <ModalComponent open={open} setOpen={setOpen} styleModal={styleModal} >
            <ModalCancelButton handleClose={() => setOpen(false)} />
            <div className="container w-3/4 flex flex-col bord">
                <EventModalContent
                    event={event}
                    textContent={textContent}
                    setTextContent={setTextContent}
                    imagesEvent={imagesEvent}
                    setImagesEvent={setImagesEvent}
                    data={data}
                    setData={setData}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                />
            </div>
            <ModalConfirmButton handleConfirm={() => handleConfirm() } />
        </ModalComponent>
    )

}