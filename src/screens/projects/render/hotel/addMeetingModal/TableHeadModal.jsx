import { TableForm } from "./TableForm"

export const TableHeadModal = ({ day, dayOfEvent, openForm, setOpenForm, meetingValues, setMeetingValues }) => {

    const dayMeeting = day.date
    const open = openForm[day.date]
    const timesMeeting = [
        { name: "Morning", timeOfEvent: "morningMeetings" },
        { name: "Afternoon", timeOfEvent: "afternoonMeetings" },
        { name: "Full Day", timeOfEvent: "fullDayMeetings" },
    ]
    const openCloseText = !openForm[day.date] ? "(Open)" : "(Close)"

    const handleOpenForm = (e) => {
        if (open) {
            setOpenForm({
                ...openForm,
                [dayMeeting]: false
            })
        } else {
            setOpenForm({
                ...openForm,
                [dayMeeting]: true
            })
        }
    }

    return (
        <div className="p-6" style={{ marginTop: "-20px" }} key={day._id}>
            <span
                className="font-bold text-xl mb-2"
                style={{ cursor: "pointer" }}
                onClick={(e) => handleOpenForm(e)}
            >
                {`${dayMeeting} ${openCloseText}`}
            </span>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border px-2 py-1"></th>
                        <th className="border px-2 py-1">Room Capacity</th>
                        <th className="border px-2 py-1">Coffee Break Units</th>
                        <th className="border px-2 py-1">Coffee Break Price</th>
                        <th className="border px-2 py-1">Audiovisuals</th>
                        <th className="border px-2 py-1">HD Delegate.Rate</th>
                        <th className="border px-2 py-1">Lunch units</th>
                        <th className="border px-2 py-1">Lunch price</th>
                        <th className="border px-2 py-1">Dinner units</th>
                        <th className="border px-2 py-1">Dinner price</th>
                        {/* <th className="border px-2 py-1">Imagen</th> */}
                    </tr>
                </thead>
                {
                    open &&
                    timesMeeting.map((el, index) => {
                        return (
                            <TableForm
                                id={index}
                                name={el.name}
                                timeOfEvent={el.timeOfEvent}
                                key={index}
                                dayOfEvent={dayOfEvent}
                                meetingValues={meetingValues}
                                setMeetingValues={setMeetingValues}
                            />
                        )
                    })
                }
            </table>
        </div>
    )
}