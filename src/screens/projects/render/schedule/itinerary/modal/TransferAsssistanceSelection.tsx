import { useEffect, useState } from "react"
import { useTransfers } from '../../../../add/toProject/transfers/render/context'
import { TransferAssistanceVendorFilter } from 'src/components/atoms'
import { DaySegmentsSelect } from "./DaySegmentsSelect"

export const TransferAsssistanceSelection = () => {
    const { freelancer, setTypeOfAssistance, typeOfAssistance, dispatch } = useTransfers()
    const isFreelancer = !freelancer ? true : false

    useEffect(() => {
        setTypeOfAssistance("guideOnBoard")
    }, [freelancer])

    const handleAddService = () => {
        dispatch({
            type: "ADD_SERVICE_EVENT",
            payload: { freelancer, typeOfAssistance }
        })
    }



    return (
        <div className="flex flex-col items-start">
            <TransferAssistanceVendorFilter />
            <DaySegmentsSelect />
            <button
                className="bg-orange-500 text-white px-4 py-2 rounded my-2 hover:bg-orange-600"
                type='button'
                onClick={() => handleAddService()}
                style={!freelancer ? { cursor: "not-allowed" } : {}}
                disabled={isFreelancer}
            >
                ADD SERVICE
            </button>
        </div>
    )
}