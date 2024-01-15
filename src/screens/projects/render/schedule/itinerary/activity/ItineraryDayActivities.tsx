import { FC, useState } from "react"
import { toast } from 'react-toastify'
import { toastOptions } from "src/helper/toast"
import { CardAddItenerary } from "src/components/atoms/CardAddItenerary"
import { useCurrentProject } from "src/hooks"
import { IntroAdd } from "src/components/atoms"
import { IntroModal } from "../../render/introModal/IntroModal"
import { titleByEvent } from "../../render/introModal/helpers"
import { ActivityCard } from "./ActivityCard"
import { IItinerary } from "src/interfaces"

interface ItineraryDayActivityProps {
    dayIndex: number
    itinerary?: IItinerary
    name: "morningActivity" | "afternoonActivity" | "nightActivity"
    date: string
}

export const ItineraryDayActivities: FC<ItineraryDayActivityProps> = ({ dayIndex, itinerary, date, name }) => {
    const { removeIteneraryEvent } = useCurrentProject()

    const [openModalIntro, setOpenModalntro] = useState(false)

    const hasActivities = itinerary && itinerary[name].events.length > 0

    if (itinerary?.itinerary.length === 0) return null

    const handleDeleteEvent = (
        dayIndex: number,
        typeOfEvent: "morningActivity" | "afternoonActivity" | "nightActivity",
        idEvent: string
    ) => {
        removeIteneraryEvent({ dayIndex, typeOfEvent, idEvent })
        toast.success(`${typeOfEvent.toUpperCase()} Removed`, toastOptions)
    }

    return (
        <div key={dayIndex}>
            <CardAddItenerary
                name={titleByEvent(name)}
                dayIndex={dayIndex}
                route="event"
                typeOfEvent={name}
                key={dayIndex}
            />
            {
                hasActivities &&
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
                itinerary &&
                itinerary[name].events.map((activity) => (
                    <ActivityCard
                        activity={activity}
                        onDelete={() => handleDeleteEvent(dayIndex, name, activity._id)}
                    />
                ))
            }
        </div>
    )
}