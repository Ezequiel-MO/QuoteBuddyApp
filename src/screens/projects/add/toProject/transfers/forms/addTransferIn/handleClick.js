import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../../helper/toast'

export const handleClick = (
    {
        city,
        company,
        vehicleCapacity,
        transfersIn,
        addTransfersIn,
        data,
        setData,
        idCompany,
        setIdCompany,
        transfers,
        transferInPrice,
        updateTransferIn,
        addUpdateExtraLines,
        removeTransferLine,
        setCompany,
        setVehicleCapacity
    }
) => {
    if (!city || !company || !vehicleCapacity || data.nrVehicles < 1) {
        toast.info(
            "If you want to add transfer please select city, company, vehicle size and number of vehicles",
            toastOptions
        )
    }
    if (transfersIn.length === 0 && city && company && Number(vehicleCapacity) && data.nrVehicles > 0) {
        setIdCompany(idCompany + 1)
        addTransfersIn({
            //render "TransferLinesRender"
            from: 'From Airport',
            type: 'Transfer in',
            units: Number(data.nrVehicles),
            total: Number(data.nrVehicles) * transferInPrice,
            idCompany: idCompany,
            //model transfer
            company: company,
            vehicleCapacity,
            nrVehicles: Number(data.nrVehicles),
            transfer_in: Number(data.nrVehicles) * transferInPrice,
            vehicleType: transfers[0].vehicleType
        })
    }
    const transferInObjects = transfersIn.filter(
        el => el.type === "Transfer in"
    )
    const found = transferInObjects.find(
        el => el.vehicleCapacity === vehicleCapacity &&
            el.company === company
    )
    if (found) {
        updateTransferIn({
            //render "TransferLinesRender"
            type: "Transfer in",
            units: Number(data.nrVehicles),
            total: Number(data.nrVehicles) * transferInPrice,
            //model transfer
            company: company,
            vehicleCapacity,
            nrVehicles: Number(data.nrVehicles),
            transfer_in: Number(data.nrVehicles) * transferInPrice,
        })
    }
    if (!found && transfersIn.length > 0 && city && company && Number(vehicleCapacity) && data.nrVehicles > 0) {
        setIdCompany(idCompany + 1)
        addTransfersIn({
            //render "TransferLinesRender"
            from: 'From Airport',
            type: 'Transfer in',
            units: Number(data.nrVehicles),
            total: Number(data.nrVehicles) * transferInPrice,
            idCompany: idCompany,
            //model transfer
            nrVehicles: Number(data.nrVehicles),
            vehicleCapacity,
            transfer_in: Number(data.nrVehicles) * transferInPrice,
            company: company,
            vehicleType: transfers[0].vehicleType
        })
    }
    if (Number(data.assistance) > 0) {
        addUpdateExtraLines({
            //render "TransferLinesRender"
            units: data.assistance,
            type: 'Assistance',
            total: data.assistance * 224,
            idCompany: idCompany + "A",
            //model transfer
            company: "CUTT/events",
            assistance: data.assistance,
            assistanceCost: data.assistance * 224
        })
    } else {
        removeTransferLine({
            type: 'Assistance'
        })
    }
    if (Number(data.meetGreet) > 0) {
        addUpdateExtraLines({
            //render "TransferLinesRender"
            units: data.meetGreet,
            type: 'Meet&Greet',
            total: data.meetGreet * 233,
            idCompany: idCompany + "M",
            //model transfer
            company: "CUTT/events",
            meetGreet: data.meetGreet,
            meetGreetCost: data.meetGreet * 233
        })
    } else {
        removeTransferLine({
            type: 'Meet&Greet',
        })
    }
    setData({ ...data, nrVehicles: 1 })
    setCompany('')
    setVehicleCapacity(0)
}