import { FC } from "react"
import { CardAddItenerary } from "src/components/atoms/CardAddItenerary"
import { MealCard } from "./MealCard"
import { IItinerary } from "src/interfaces"

interface ItineraryDayMealsProps {
    dayIndex: number
    itinerary?: IItinerary
    name: "lunch" | "dinner"
}

export const ItineraryDayMeals: FC<ItineraryDayMealsProps> = ({ dayIndex, itinerary, name }) => {

    if (itinerary?.itinerary.length === 0) return



    return (
        <div>
            <CardAddItenerary
                name={name}
                dayIndex={dayIndex}
                route="restaurant"
                typeOfEvent={name}
                key={dayIndex}
            />
            {
                name === "lunch" ?
                itinerary?.lunch.restaurants.map((restaurant) =>(
                    <MealCard restaurant={restaurant} />
                ))
                :
                itinerary?.dinner.restaurants.map((restaurant) =>(
                    <MealCard restaurant={restaurant} />
                ))
            }
        </div>
    )
}