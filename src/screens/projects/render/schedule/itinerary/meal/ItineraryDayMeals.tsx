import { FC, useState } from "react"
import { toast } from 'react-toastify'
import { toastOptions } from "src/helper/toast"
import { useCurrentProject } from "src/hooks"
import { CardAddItenerary } from "src/components/atoms/CardAddItenerary"
import { IntroAdd } from "src/components/atoms"
import { IntroModal } from "../../render/introModal/IntroModal"
import { MealCard } from "./MealCard"
import { IItinerary } from "src/interfaces"

interface ItineraryDayMealsProps {
    dayIndex: number
    itinerary?: IItinerary
    name: "lunch" | "dinner"
    date: string
}

export const ItineraryDayMeals: FC<ItineraryDayMealsProps> = ({ dayIndex, itinerary, name, date }) => {
    const { removeIteneraryEvent } = useCurrentProject()

    const [openModalIntro, setOpenModalntro] = useState(false)

    const hasRestaurants = itinerary && itinerary[name].restaurants.length > 0

    if (itinerary?.itinerary.length === 0) return

    const handleDeleteRestaurant = (
        dayIndex: number,
        typeOfEvent: "lunch" | "dinner",
        idEvent: string
    ) => {
        removeIteneraryEvent({ dayIndex, typeOfEvent, idEvent })
        toast.success(`${typeOfEvent.toUpperCase()} Removed`, toastOptions)
    }

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
                hasRestaurants &&
                <div className="my-2">
                    <IntroAdd events={itinerary[name]} setOpen={setOpenModalntro} />
                    <IntroModal
                        open={openModalIntro}
                        setOpen={setOpenModalntro}
                        day={date}
                        dayIndex={dayIndex}
                        eventType={name}
                        events={itinerary[name]}
                        isItinerary={true}
                    />
                </div>
            }
            {
                name === "lunch" ?
                    itinerary?.lunch.restaurants.map((restaurant) => (
                        <MealCard
                            restaurant={restaurant}
                            onDelete={() => handleDeleteRestaurant(dayIndex, name, restaurant._id)}
                        />
                    ))
                    :
                    itinerary?.dinner.restaurants.map((restaurant) => (
                        <MealCard
                            restaurant={restaurant}
                            onDelete={() => handleDeleteRestaurant(dayIndex, name, restaurant._id)}
                        />
                    ))
            }
        </div>
    )
}