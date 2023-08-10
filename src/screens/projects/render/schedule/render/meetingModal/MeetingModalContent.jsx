import { TableHeadModalMeeting } from "./TableHeadModalMeeting"

export const MeetingModalContent = ({
    meeting,
    typeOfEvent,
    data,
    setData,
    isChecked,
    setIsChecked
}) => {
    return (
        <>
            <h1 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '24px' }}>
                Meeting: {meeting.hotelName}
            </h1>
            <TableHeadModalMeeting
                meeting={meeting}
                data={data}
                setData={setData}
                isChecked={isChecked}
                setIsChecked={setIsChecked}
            />
        </>
    )

}