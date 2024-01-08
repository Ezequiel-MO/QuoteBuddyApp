import { FC, useState } from "react"
import { toast } from 'react-toastify'
import { toastOptions } from "src/helper/toast"
import { CardAddItenerary } from "src/components/atoms/CardAddItenerary"
import { useCurrentProject } from "src/hooks"
import { IntroAdd } from "src/components/atoms"
import { IntroModal } from "../../render/introModal/IntroModal"
import { ActivityCard } from "./ActivityCard"
import { IItinerary } from "src/interfaces"

interface ItineraryDayActivityProps {
    dayIndex: number
    itinerary?: IItinerary
    date: string
}

export const ItineraryDayActivities: FC<ItineraryDayActivityProps> = ({ dayIndex, itinerary, date }) => {
    const { removeIteneraryEvent } = useCurrentProject()

    const [openModalIntro, setOpenModalntro] = useState(false)

    const hasActivities = itinerary?.activity.events && itinerary.activity.events.length > 0

    if (itinerary?.itinerary.length === 0) return null

    const handleDeleteEvent = (
        dayIndex: number,
        typeOfEvent: "activity",
        idEvent: string
    ) => {
        removeIteneraryEvent({ dayIndex, typeOfEvent, idEvent })
        toast.success(`${typeOfEvent.toUpperCase()} Removed`, toastOptions)
    }

    return (
        <div key={dayIndex}>
            <CardAddItenerary
                name="activity"
                dayIndex={dayIndex}
                route="event"
                typeOfEvent="activity"
            />
            {
                hasActivities &&
                <div className="my-2">
                    <IntroAdd events={itinerary?.activity} setOpen={setOpenModalntro} />
                    <IntroModal
                        open={openModalIntro}
                        setOpen={setOpenModalntro}
                        day={date}
                        dayIndex={dayIndex}
                        eventType="activity"
                        events={itinerary.activity}
                        isItinerary={true}
                    />
                </div>
            }
            {
                itinerary?.activity.events.map((activity) => (
                    <ActivityCard
                        activity={activity}
                        onDelete={() => handleDeleteEvent(dayIndex, "activity", activity._id)}
                    />
                ))
            }
        </div>
    )
}