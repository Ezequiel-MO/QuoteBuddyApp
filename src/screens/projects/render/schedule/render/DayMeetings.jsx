import { useState } from "react"
import { MeetingCard } from "./card/MeetingCard"
import { IntroAdd } from '../../../../../components/atoms'
import { IntroModal } from "./introModal/IntroModal"
import { MeetingModal } from "./meetingModal/MeetingModal"
import styles from '../../DayEvents.module.css'

export const DayMeetings = ({ event, day, handleDeleteEvent, dayIndex, }) => {
    const meetings = day[event]?.meetings ?? []
    const [openModalIntro, setOpenModalIntro] = useState(false)
    const [open, setOpen] = useState(false)
    const [meetingtModal, setMeetingEventModal] = useState()

    const handleClick = (e, eventModal) => {
        setMeetingEventModal(eventModal)
        setOpen(true)
    }

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
            <MeetingModal
                open={open}
                setOpen={setOpen}
                meeting={meetingtModal}
                dayIndex={dayIndex}
                typeOfEvent={event}
            />
            {
                meetings.map((el, index) => (
                    <MeetingCard
                        meeting={el}
                        dayIndex={dayIndex}
                        index={index}
                        handleClick={handleClick}
                        onDelete={() => handleDeleteEvent(dayIndex, event, el._id)}
                        key={index}
                    />
                ))
            }
        </div>
    )
}