import { FC } from "react"
import {  IRestaurant } from "../../../../../../interfaces"

interface AddOrEditVenueProps{
    typeEvent:string
    isDragging:boolean
    event:IRestaurant
}


export const AddOrEditVenue:FC<AddOrEditVenueProps> = ({ typeEvent , event , isDragging}) => {

    const isRestaurant = ["lunch", "dinner"]
    if(!isRestaurant.includes(typeEvent) || isDragging || event?.isVenue === false) return null

    return (
        <span
            role="button"
            className="hover:text-orange-500 hover:scale-110 hover:transition hover:duration-150 hover:ease-in-out"
            style={{ color: "white", fontSize: "15px", display: "inline-block" }}
            onClick={(e) => {
                e.stopPropagation()
                alert("open Modal Form Venue ")
            }}
        >
            <abbr title="Open form Venue">
                Add Venue Details
            </abbr>
        </span>
    )
}