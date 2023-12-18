import { FC } from 'react'
import { TransferVendorFilter, VehicleSizeFilter } from '../../../../../../ui'
import { useGetTransferObject } from '../../../../../../hooks'
import { useTransfers } from '../../../../add/toProject/transfers/render/context'
import { TransferServiceFilter } from "src/ui"
import { ITransfer } from '@interfaces/transfer'


export const ItineraryVehicleSelection: FC = () => {
    const {
        city,
        company,
        setCompany,
        vehicleCapacity,
        setVehicleCapacity,
        service,
        setService,
        dispatch,
    } = useTransfers()

    const { transferObject } = useGetTransferObject({
        city,
        company,
        vehicleCapacity
    })

    const handleAddTransfer = () => {
        const transfers: ITransfer[] = [transferObject].flat()
        const [transfer] = transfers
        const addTransfer: ITransfer = { ...transfer, selectedService: service }
        dispatch({
            type: 'ADD_TRANSFER_EVENT',
            payload: addTransfer
        })
    }


    return (
        <div className="flex flex-col items-start">
            <TransferVendorFilter
                setCompany={setCompany}
                company={company}
                city={city}
            />
            <VehicleSizeFilter
                company={company}
                city={city}
                vehicleCapacity={vehicleCapacity}
                setVehicleCapacity={setVehicleCapacity}
            />
            <TransferServiceFilter
                company={company}
                city={city}
                vehicleCapacity={vehicleCapacity}
                service={service}
                setService={setService}
                allServices={false}
            />
            <button
                className="bg-orange-500 text-white px-4 py-2 rounded my-2 hover:bg-orange-600"
                style={Object.values(transferObject).length === 0 || !service ? { cursor: "not-allowed" } : {}}
                onClick={handleAddTransfer}
                disabled={Object.values(transferObject).length === 0 || !service}
            >
                ADD TRANSFER
            </button>
        </div>
    )
}
