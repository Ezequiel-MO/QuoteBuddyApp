import { CityFilter } from "src/components/atoms"
import { useTransfers } from '../../../../add/toProject/transfers/render/context'
import { ItineraryVehicleSelection } from "./ItineraryVehicleSelection"
import { TransferAsssistanceSelection } from "./TransferAsssistanceSelection"

export const ItineraryModalHeader = () => {

    const { city, setCity } = useTransfers()

    return (
        <div className="border border-slate-500 grid grid-cols-3 gap-2">
            <div className="max-w-[250px] self-start">
                <CityFilter city={city} setCity={setCity} />
            </div>
            <div className="max-w-[250px] self-start">
                <ItineraryVehicleSelection />
            </div>
            <div className="max-w-[250px] self-start">
                <TransferAsssistanceSelection />
            </div>
        </div>
    )
}