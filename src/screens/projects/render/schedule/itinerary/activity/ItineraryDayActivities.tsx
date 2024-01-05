import { FC } from "react"
import { CardAddItenerary } from "src/components/atoms/CardAddItenerary"
import { IItinerary } from "src/interfaces"
import { ActivityCard } from "./ActivityCard"

interface ItineraryDayActivityProps {
    dayIndex: number
    itinerary?: IItinerary
}

export const ItineraryDayActivities: FC<ItineraryDayActivityProps> = ({ dayIndex, itinerary }) => {

    if (itinerary?.itinerary.length === 0) return null

    return (
        <div>
            <CardAddItenerary
                name="activity"
                dayIndex={dayIndex}
                route="event"
                typeOfEvent="activity"
            />
            {
                itinerary?.activity.events.map((activity) => (
                    <ActivityCard activity={activity} />
                ))
            }
        </div>
    )
}