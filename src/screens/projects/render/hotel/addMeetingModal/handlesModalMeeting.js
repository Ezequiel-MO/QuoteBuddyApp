// import { useCallback } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const mySwal = withReactContent(Swal)

export const handleConfirm = ({ meetingValues, addEventToSchedule, hotel, setOpen }) => {
    for (let i in meetingValues) {
        const [timeOfEvent, dayOfEvent] = i.split("-")
        let values = Object.values(meetingValues[i])
        values = values.filter(el => el.length > 0)
        if (values.length > 0) {
            const event = {
                ...meetingValues[i],
                hotel: [hotel._id],
                hotelName: hotel.name
            }
            addEventToSchedule({
                dayOfEvent: Number(dayOfEvent),
                timeOfEvent,
                event
            })
        }
    }
    mySwal.fire({
        title: 'Success',
        icon: 'success',
        confirmButtonText: 'continue',
        customClass: { container: 'custom-container' }
    })
    setTimeout(() => {
        setOpen(false)
    },500 )
}