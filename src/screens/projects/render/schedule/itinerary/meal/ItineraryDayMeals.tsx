import { FC } from "react"
import { CardAddItenerary } from "src/components/atoms/CardAddItenerary"
import { IItinerary } from "src/interfaces"

interface ItineraryDayMealsProps {
    dayIndex: number
    itinerary?: IItinerary
    name: string
}

export const ItineraryDayMeals: FC<ItineraryDayMealsProps> = ({ dayIndex, itinerary, name }) => {

    if(itinerary?.itinerary.length === 0) return



    return (
        <div>
            <CardAddItenerary name={name} />
        </div>
    )
}