import React, { useState, useEffect, useRef, FC } from "react"
import { DeleteIcon } from './DeleteIcon'
import { IEvent, IRestaurant } from "../../../../../../interfaces"
import { useCurrentProject } from '../../../../../../hooks'
import { TransfersProvider } from '../../../../add/toProject/transfers/render/context'
import { ModalAddEvent } from "../../../../add/toSchedule/addModalEvent/ModalAddEvent"

interface EventCardTransferProps {
    event: IEvent | IRestaurant
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    typeEvent?: string
    dayIndex?: number
    setChange: React.Dispatch<React.SetStateAction<boolean>>
}

export const EventCardTransfer: FC<EventCardTransferProps> = ({ event, open, setOpen, typeEvent, dayIndex, setChange }) => {
    const ref = useRef<HTMLDivElement | null>(null); //esto lo utilizo para acceder ref.current del DOM
    const { editTransferEventOrRestaurant } = useCurrentProject()
    const [show, setShow] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setShow(true)
            }, 600)
        } else {
            setShow(false)
        }
    }, [open])

    const handleClickOutside = (e: MouseEvent) => { // funcion que cuando se haga clic fuera del div va setear open a false
        if (ref.current && !ref.current.contains(e.target as Node) && open) {
            const includesTypes = ["HTML", "ABBR", "svg", "path"]
            if (includesTypes.includes((e.target as HTMLElement).nodeName)) {
                return
            }
            setOpen(false)
            setChange(false)
            //ESTO ES UNA PRUEBA
            // console.log((e.target as HTMLElement).nodeName)
        }
    }

    useEffect(() => {
        if (!openModal) {
            document.addEventListener("mousedown", handleClickOutside) // escucha el evento "mousedown" y le paso la funcion que cree
            return () => {
                document.removeEventListener("mousedown", handleClickOutside) // elemina el evento "mousedown" y le paso la funcion que cree
            }
        }
    }, [open, openModal])


    const handleDelete = (indexTransfer: number) => {
        const idEvent = event._id
        let transfersFilter
        if (event.transfer) {
            transfersFilter = event.transfer.filter((_, index) => index !== indexTransfer)
        }
        editTransferEventOrRestaurant({
            typeEvent,
            dayIndex,
            idEvent,
            transferEdit: transfersFilter
        })
    }


    if (event.transfer && event?.transfer.length === 0 || !open) return null

    return (
        <>
            <TransfersProvider>
                <ModalAddEvent
                    event={event}
                    open={openModal}
                    setOpen={setOpenModal}
                    update={true}
                    dayIndex={dayIndex}
                    typeEvent={typeEvent}
                />
                <div
                    ref={ref} //
                    className={`transition-all duration-1000 ease-in ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} bg-slate-700 p-4 rounded-lg shadow-md max-w-[600px] text-white-0 active:scale-95 active:duration-200`}
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                        setTimeout(() => {
                            setOpenModal(true)
                        }, 200)
                    }}
                >
                    <div className="grid grid-cols-4 text-white font-semibold border-b-2 border-white">
                        <div>Vehicle Capacity</div>
                        <div>Vehicle Type</div>
                        <div>Type of Service</div>
                    </div>
                    {
                        show && event.transfer &&
                        event?.transfer.map(({ _id, selectedService, ...el }, index) => {
                            return (
                                <div
                                    key={index}
                                    className=" grid grid-cols-4 text-white p-2 border-b border-white"
                                >
                                    <div>{`${el.vehicleCapacity} Seater`}</div>
                                    <div>{el.vehicleType}</div>
                                    <div>{`${selectedService}`}</div>
                                    <div style={{ marginLeft: "20px" }}>
                                        <DeleteIcon id={_id} onDelete={(id) => handleDelete(index)} />
                                    </div>
                                    {
                                        index === 0 && el.assistance > 0 && (
                                            <div className="col-span-3 text-sm text-gray-200 mt-2">
                                                {
                                                    el.assistance > 0 && (
                                                        <p>
                                                            Assistance: {el.assistance} Unit/s- Cost:{' '}
                                                            {el.assistanceCost} EUR
                                                        </p>
                                                    )}
                                            </div>
                                        )}
                                </div>
                            )
                        })
                    }
                </div>
            </TransfersProvider>
        </>
    )
}