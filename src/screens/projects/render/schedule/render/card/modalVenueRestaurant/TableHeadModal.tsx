import { FC } from "react"
import { IVenuePrice, IRestaurant } from "../../../../../../../interfaces"
import { TableForm } from "./TableForm"

interface TableHeadModalProps {
    value: IVenuePrice
    setValue: React.Dispatch<React.SetStateAction<IVenuePrice>>
    isChecked: object
    setIsChecked: React.Dispatch<React.SetStateAction<object>>
    restaurant: IRestaurant
}

export const TableHeadModal: FC<TableHeadModalProps> = ({ value, setValue, isChecked, setIsChecked, restaurant }) => {
    return (
        <div className="p-6" style={{ marginTop: "-20px" }}>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border px-2 py-1">Rental</th>
                        <th className="border px-2 py-1">Cocktail Units</th>
                        <th className="border px-2 py-1">cocktail Price</th>
                        <th className="border px-2 py-1">Catering Units</th>
                        <th className="border px-2 py-1">Catering Price</th>
                        <th className="border px-2 py-1">Staff Units</th>
                        <th className="border px-2 py-1">Staff Menu Price</th>
                        <th className="border px-2 py-1">Cleaning</th>
                        <th className="border px-2 py-1">Security</th>
                        <th className="border px-2 py-1">Entertainment</th>
                    </tr>
                </thead>
                <TableForm
                    value={value}
                    setValue={setValue}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                    restaurant={restaurant}
                />
            </table>
        </div>
    )
}