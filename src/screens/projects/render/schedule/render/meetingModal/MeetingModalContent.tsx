import { FC } from 'react'
import { IMeeting } from "@interfaces/meeting"
import { TableHeadModalMeeting } from "./TableHeadModalMeeting"

interface MeetingModalContentProps {
    meeting?: IMeeting;
    timeOfEvent: "fullDayMeetings" | "morningMeetings" | "afternoonMeetings";
    data: Record<string, number>;
    setData: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    isChecked: Record<string, boolean>;
    setIsChecked: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    dayIndex: number
}

export const MeetingModalContent: FC<MeetingModalContentProps> = ({
    meeting,
    timeOfEvent,
    data,
    setData,
    isChecked,
    setIsChecked,
    dayIndex
}) => {
    return (
        <>
            <h1 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '24px' }}>
                Meeting: {meeting?.hotelName}
            </h1>
            <TableHeadModalMeeting
                meeting={meeting}
                data={data}
                setData={setData}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
                timeOfEvent={timeOfEvent}
                dayIndex={dayIndex}
            />
        </>
    )

}