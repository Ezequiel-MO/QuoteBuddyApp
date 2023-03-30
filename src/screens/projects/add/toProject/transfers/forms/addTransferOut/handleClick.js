import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../../helper/toast'

export const handleClick = (
    {
        city,
        company,
        vehicleCapacity,
        transfersOut,
        addTransfersOut,
        data,
        setData,
        idCompany,
        setIdCompany,
        transfers,
        transferOutPrice,
        updateTransferOut,
        addUpdateExtraLines,
        removeTransferLine,
        setCompany,
        setVehicleCapacity,
        meetGreetOrDispatch,
        assistance
    }
) => {
    if (!city || !company || !vehicleCapacity || data.nrVehicles < 1) {
        toast.info(
            "If you want to add transfer please select city, company, vehicle size and number of vehicles",
            toastOptions
        )
    }
    if (transfersOut.length === 0 && city && company && Number(vehicleCapacity) && data.nrVehicles > 0) {
        setIdCompany(idCompany + 1)
        addTransfersOut({
            //render "TransferLinesRender"
            from: 'From Hotel',
            units: Number(data.nrVehicles),
            type: 'Transfer Out',
            total: Number(data.nrVehicles) * transferOutPrice,
            idCompany: idCompany,
            //model transfer
            company: company,
            vehicleCapacity,
            nrVehicles: Number(data.nrVehicles),
            transfer_out: Number(data.nrVehicles) * transferOutPrice,
            vehicleType: transfers[0].vehicleType
        })
    }
    const transferOutObjects = transfersOut.filter(
        (transfer) => transfer.type === 'Transfer Out'
    )
    const found = transferOutObjects.find(
        (transfer) => transfer.vehicleCapacity === vehicleCapacity &&
            transfer.company === company
    )
    if (found) {
        updateTransferOut({
            //render "TransferLinesRender"
            units: Number(data.nrVehicles),
            type: 'Transfer Out',
            total: Number(data.nrVehicles) * transferOutPrice,
            //model transfer
            company: company,
            vehicleCapacity,
            nrVehicles: Number(data.nrVehicles),
            transfer_out: Number(data.nrVehicles) * transferOutPrice,
        })
    }
    if (!found && transfersOut.length > 0 && city && company && Number(vehicleCapacity) && data.nrVehicles > 0) {
        setIdCompany(idCompany + 1)
        addTransfersOut({
            //render "TransferLinesRender"
            from: 'From Hotel',
            units: Number(data.nrVehicles),
            type: 'Transfer Out',
            total: Number(data.nrVehicles) * transferOutPrice,
            idCompany: idCompany,
            //model transfer
            nrVehicles: Number(data.nrVehicles),
            vehicleCapacity,
            transfer_out: Number(data.nrVehicles) * transferOutPrice,
            company: company,
            vehicleType: transfers[0].vehicleType
        })
    }
    if (Number(data.assistance) > 0 && Object.values(assistance).length > 0) {
        addUpdateExtraLines({
            //render "TransferLinesRender"
            units: data.assistance,
            type: 'Assistance',
            total: data.assistance * assistance.halfDayRate,
            idCompany: idCompany + "A",
            //model transfer
            company: assistance.familyName,
            assistance: data.assistance,
            assistanceCost: data.assistance * assistance.halfDayRate
        })
    } else {
        removeTransferLine({
            type: 'Assistance'
        })
    }
    if (Number(data.groupDispatch) > 0 && Object.values(meetGreetOrDispatch).length > 0) {
        addUpdateExtraLines({
            //render "TransferLinesRender"
            units: data.groupDispatch,
            type: 'Group Dispatch',
            total: data.groupDispatch * meetGreetOrDispatch.fullDayRate,
            idCompany: idCompany + "G",
            //model transfer
            company: meetGreetOrDispatch.familyName,
            meetGreet: data.groupDispatch,
            meetGreetCost: data.groupDispatch * meetGreetOrDispatch.fullDayRate
        })
    } else {
        removeTransferLine({
            type: 'Group Dispatch',
        })
    }
    setData({ ...data, nrVehicles: 1 })
    setCompany('')
    setVehicleCapacity(0)
}