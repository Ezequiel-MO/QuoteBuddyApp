import { FC } from 'react'
import { CityFilter } from '../../../../../components/atoms'
import { useTransfers } from '../../toProject/transfers/render/context'
import { VehicleSelectionTransfer } from "./VehicleSelectionTransfer"
import { TransferAsssistanceSelection } from "./TransferAsssistanceSelection"

export const TransfersHeader: FC = () => {
    const { city, setCity } = useTransfers()

    return (
        <div className="border border-slate-500 grid grid-cols-3 gap-2 py-2">
            <div className="max-w-[250px] self-start text-white-0">
                <CityFilter city={city} setCity={setCity} />
            </div>
            <div className="max-w-[250px] self-start">
                <VehicleSelectionTransfer />
            </div>
            <div className="max-w-[250px] self-start">
                <TransferAsssistanceSelection />
            </div>
        </div>
    )
}