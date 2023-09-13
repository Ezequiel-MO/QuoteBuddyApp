import { FC , useState } from "react"
import { IRestaurant } from "../../../../../../interfaces"
import { Button } from "../../../../../../components/atoms"
import {ModalVenue} from "./modalVenueRestaurant/ModalVenue"

interface AddOrEditVenueProps {
    typeEvent: string
    isDragging: boolean
    restaurant: IRestaurant
    open:boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export const AddOrEditVenue: FC<AddOrEditVenueProps> = ({ typeEvent, restaurant, isDragging , open , setOpen }) => {
    const classVenue = "text-base inline-block text-white-0 hover:text-orange-500 hover:scale-150 hover:transition hover:duration-150 hover:ease-in-out"


    const isRestaurant = ["lunch", "dinner"]
    if (!isRestaurant.includes(typeEvent) || isDragging || !restaurant?.isVenue) return null

    return (
        <>
        <ModalVenue open={open} setOpen={setOpen} restaurant={restaurant}/>
            <Button
                type="button"
                newClass={classVenue}
                icon=""
                handleClick={() => setOpen(true)}
            >
                <abbr title="Open form Venue">
                    Add Venue Details
                </abbr>
            </Button>
        </>
    )
}