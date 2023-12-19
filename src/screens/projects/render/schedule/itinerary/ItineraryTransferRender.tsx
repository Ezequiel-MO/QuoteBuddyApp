import React, { FC } from "react"
import { DeleteIcon } from '@components/atoms'
import { IItinerary, ServiceKey } from "src/interfaces"


interface ItineraryTransferRenderProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    dayIndex: number
    setDayIndex: React.Dispatch<React.SetStateAction<number | undefined>>
    itinerary?: IItinerary
    setItinerary: React.Dispatch<React.SetStateAction<IItinerary | undefined>>
}


export const ItineraryTransferRender: FC<ItineraryTransferRenderProps> = ({ itinerary, setOpenModal, setItinerary, dayIndex, setDayIndex }) => {


    const handleClick = () => {
        setOpenModal(true)
        setDayIndex(dayIndex)
        setItinerary(itinerary)
    }

    const handleDelete = (id: string, index: number) => {
        console.log({ id, index })
    }

    return (
        <div
            className="bg-slate-700 p-4 rounded-lg shadow-md max-w-[600px] text-white-0 active:scale-95 active:transition active:duration-150 active:ease-in-out cursor-pointer"
            onClick={handleClick}
        >
            <div className="grid grid-cols-3 text-white font-semibold border-b-2 border-white">
                <div>Vehicle Capacity</div>
                <div>Vehicle Type</div>
                <div>Cost (Service)</div>
            </div>
            {itinerary?.itinerary?.map((transfer, index) => (
                <div
                    key={index}
                    className="grid grid-cols-3 text-white p-2 border-b border-white"
                >
                    <div>{`${transfer.vehicleCapacity} Seater`}</div>
                    <div>{transfer.vehicleType}</div>
                    <div>
                        {transfer[transfer.selectedService as ServiceKey]} EUR {`(${transfer.selectedService})`}
                        <span style={{marginLeft:"3px"}}>
                            <DeleteIcon
                                id={transfer._id}
                                onDelete={(id) => handleDelete(id, index)}
                            />
                        </span>
                    </div>
                    {index === 0 && transfer.assistance > 0 && (
                        <div className="col-span-3 text-sm text-gray-200 mt-2">
                            {transfer.assistance > 0 && (
                                <p>
                                    Assistance: {transfer.assistance} Unit/s- Cost:{' '}
                                    {transfer.assistanceCost} EUR
                                </p>
                            )}
                        </div>
                    )}
                </div>
            ))}
            <span>Starts: {itinerary && itinerary?.starts}</span>
            <span style={{ marginLeft: "50px" }}>Ends: {itinerary && itinerary?.ends}</span>
        </div>
    )
}