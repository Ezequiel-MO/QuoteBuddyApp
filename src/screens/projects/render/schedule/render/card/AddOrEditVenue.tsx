import { FC } from "react"
import { IRestaurant } from "../../../../../../interfaces"
import { Button } from "../../../../../../components/atoms"

interface AddOrEditVenueProps {
    typeEvent: string
    isDragging: boolean
    restaurant: IRestaurant
}


export const AddOrEditVenue: FC<AddOrEditVenueProps> = ({ typeEvent, restaurant, isDragging }) => {

    const classVenue = "text-base inline-block text-white-0 hover:text-orange-500 hover:scale-150 hover:transition hover:duration-150 hover:ease-in-out"


    const isRestaurant = ["lunch", "dinner"]
    if (!isRestaurant.includes(typeEvent) || isDragging || !restaurant?.isVenue) return null

    return (
        <>
            <Button
                type="button"
                newClass={classVenue}
                icon=""
                handleClick={() => alert("open Modal Form Venue ")}
            >
                <abbr title="Open form Venue">
                    Add Venue Details
                </abbr>
            </Button>
        </>
    )
}