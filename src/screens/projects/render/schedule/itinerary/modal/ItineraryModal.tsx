import React, { FC, useEffect, useState } from "react"
import { ModalComponent } from "src/components/atoms/modal/Modal"
import { ModalCancelButton, Spinner } from "src/components/atoms"
import { ItineraryModalHeader } from "./ItineraryModalHeader"
import { useTransfers } from '../../../../add/toProject/transfers/render/context'
import { IteneraryTransferSection } from "./IteneraryTransferSection"
import { ServiceSection } from "src/screens/projects/add/toSchedule/addModalEvent/ServiceSection"
import { transfersIncludedAssistance } from "src/screens/projects/add/toSchedule/addModalEvent/helperAndHandles"
import { useCurrentProject } from "src/hooks"
import { alertSwal } from "./helper"
import { toast } from 'react-toastify'
import { toastOptions } from "src/helper/toast"
import { IItinerary } from "src/interfaces"


interface ItineraryModalProps {
    dayIndex?: number
}

type TypeSegment = 'morning' | 'afternoon' | 'night'

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
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)'
}


export const ItineraryModal: FC<ItineraryModalProps> = ({ dayIndex }) => {
    const {
        state,
        starts,
        setStarts,
        ends,
        setEnds,
        setCompany,
        setVehicleCapacity,
        setService,
        setCity,
        setItinerary,
        open,
        setOpen,
        itinerary,
        dispatch
    } = useTransfers()

    const { addItenerayTransfer } = useCurrentProject()

    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        setCity("")
        setCompany('')
        setVehicleCapacity('')
        setService('')
        setStarts("")
        setEnds("")
        setItinerary(null)
        if (itinerary) {
            setItinerary(itinerary)
            setStarts(itinerary?.starts)
            setEnds(itinerary?.ends)
        }
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [open])


    const handleClose = () => {
        dispatch({
            type: 'RESET_TRANSFER_EVENT'
        })
        dispatch({
            type: "RESET_SERVICE_EVENT"
        })
        setItinerary(null)
        setOpen(false)
    }

    const handleSubmit = async () => {
        const isAlert = await alertSwal({ starts, ends, transferEvent: state.transferEvent })
        if (isAlert) {
            return
        }
        const updatedTransfers = transfersIncludedAssistance(
            state.servicesEvent,
            state.transferEvent
        )
        setLoading(true)
        try {
            addItenerayTransfer({
                dayIndex: dayIndex as number,
                starts: starts as TypeSegment,
                ends: ends as TypeSegment,
                transfers: updatedTransfers
            })
            toast.success('Add Transfer/s to Itenerary', toastOptions)
            dispatch({
                type: 'RESET_TRANSFER_EVENT'
            })
            dispatch({
                type: "RESET_SERVICE_EVENT"
            })
            setOpen(false)
        } catch (error: any) {
            console.log(error)
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
        <ModalComponent open={open} setOpen={handleClose} styleModal={styleModal}>
            <ModalCancelButton handleClose={() => handleClose()} />
            <div className="custom-scrollbar bg-slate-200 rounded-lg shadow-lg overflow-y-auto max-h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-9/10">
                <ItineraryModalHeader />
                <IteneraryTransferSection />
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