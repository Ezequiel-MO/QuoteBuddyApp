import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TransfersHeader } from "./TransfersHeader"
import { TransferSection } from "./TransferSection"
import { ServiceSection } from "./ServiceSection"
import { transfersIncludedAssistance } from "./helperAndHandles"
import { ModalComponent } from '../../../../../components/atoms/modal/Modal'
import { ModalCancelButton, Spinner } from '../../../../../components/atoms'
import { useCurrentProject } from '../../../../../hooks'
import { useTransfers } from '../../toProject/transfers/render/context'
//
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'


const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '90%',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
    p: 2,
    overflowY: 'auto',
}

export const ModalAddEvent = ({ open, setOpen, event }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { currentProject, addEventToSchedule } = useCurrentProject()
    const { setCity, state, dispatch, setCompany, setVehicleCapacity, setService } = useTransfers()
    const { groupLocation } = currentProject
    const { transferEvent, servicesEvent } = state
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setCity(groupLocation)
        setTimeout(() => {
            setLoading(false)
        }, 1200)
    }, [groupLocation, open])
    

    const handleClose = () => {
        setCompany("")
        setVehicleCapacity("")
        setService("")
        dispatch({
            type: 'RESET_TRANSFER_EVENT',
        })
        setOpen(false)
    }


    const handleSubmit = async () => {
        setLoading(true)
        const updatedTransfers = transfersIncludedAssistance(servicesEvent, transferEvent)
        try {
            event.transfer = updatedTransfers
            addEventToSchedule({
                event: event,
                dayOfEvent: location.state.dayOfEvent,
                timeOfEvent: location.state.timeOfEvent
            })
            toast.success('Event Added to Schedule', toastOptions)
            setOpen(false)
            setTimeout(() => {
                navigate('/app/project/schedule')
            }, 600)
        } catch (err) {
            console.log(err)
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
        <ModalComponent open={open} setOpen={() => handleClose()} styleModal={styleModal} >
            <ModalCancelButton handleClose={() => handleClose()} />
            <div className="custom-scrollbar bg-slate-200 rounded-lg shadow-lg overflow-y-auto max-h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-9/10">
                <TransfersHeader />
                <TransferSection />
                <ServiceSection />
                <button
                    className="bg-orange-500 text-white px-4 py-2 rounded my-2 hover:bg-orange-600"
                    type='button'
                    onClick={() => handleSubmit()}
                >
                    Save Data
                </button>
            </div>
        </ModalComponent>
    )
}