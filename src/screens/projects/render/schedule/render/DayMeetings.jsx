import { useState } from "react"
import { MeetingCard } from "./card/MeetingCard"
import { IntroAdd } from '../../../../../components/atoms'
import { IntroModal } from "./introModal/IntroModal"
import styles from '../../DayEvents.module.css'

export const DayMeetings = ({ event, day, handleDeleteEvent, dayIndex, }) => {
    const meetings = day[event]?.meetings
    const [openModalIntro, setOpenModalIntro] = useState(false)

    return (
        <div
            className={
                ['morningMeetings', 'afternoonMeetings', 'fullDayMeetings'].includes(
                    event
                ) && day[event].length === 0
                    ? styles.emptyDayEventsContainer
                    : styles.dayEventsContainer
            }
        >
            <IntroAdd setOpen={setOpenModalIntro} events={day[event]} />
            <IntroModal
                day={day.date}
                open={openModalIntro}
                setOpen={setOpenModalIntro}
                eventType={event}
                dayIndex={dayIndex}
                events={day[event]}
            />
            {
                meetings.map((el, index) => (
                    <MeetingCard
                        meeting={el}
                        dayIndex={dayIndex}
                        index={index}
                        onDelete={() => handleDeleteEvent(dayIndex, event, el.hotelName + dayIndex)}
                        key={index}
                    />
                ))
            }
        </div>
    )
}