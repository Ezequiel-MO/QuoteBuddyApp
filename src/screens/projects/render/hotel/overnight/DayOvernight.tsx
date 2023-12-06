import { useState, FC  } from 'react'
import { IntroAdd } from 'src/components/atoms'
import { CardAdd } from 'src/components/atoms'
import { useCurrentProject } from 'src/hooks'
import { IntroModal } from '../../schedule/render/introModal/IntroModal'
import { HotelCard } from "../HotelCard"
import { HotelModal } from '../hotelModal/HotelModal'
import { IDay, IHotel } from "src/interfaces"

interface IHotelId {
    id: string
}

interface DayOvernightProps {
    day: IDay
    dayIndex: number
    onDelete: (id: string) => Promise<boolean>
}


export const DayOvernight: FC<DayOvernightProps> = ({ day, dayIndex, onDelete }) => {

    const hotels = day.overnight?.hotels ?? []
    const hasHotels = hotels && hotels.length > 0

    const { currentProject, removeHotelOvernightSchedule } = useCurrentProject()
    const [openModalIntro, setOpenModalIntro] = useState(false)

    const [open, setOpen] = useState(false)
    const [hotelModal, setHotelModal] = useState<IHotel>()

    const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, hotel: IHotel) => {
        setHotelModal(hotel)
        setOpen(true)
    }

    const handleDeleteHotel = async (dayOfEvent: number, hotelId: string) => {
        try {
            const isConfirm = await onDelete(hotelId)
            if (isConfirm) {
                removeHotelOvernightSchedule({ dayIndex: dayOfEvent, hotelId })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col space-y-4 w-full hover:bg-gray-700">
            <HotelModal open={open} setOpen={setOpen} hotel={hotelModal} dayIndex={dayIndex} />
            <CardAdd
                name="hotel"
                route="hotel"
                dayOfEvent={dayIndex}
            />
            {
                hasHotels &&
                <>
                    <IntroAdd setOpen={setOpenModalIntro} events={day.overnight} />
                    <IntroModal
                        day={day.date}
                        open={openModalIntro}
                        setOpen={setOpenModalIntro}
                        eventType={"overnight"}
                        dayIndex={dayIndex}
                        events={day.overnight}
                    />
                </>
            }
            {
                day?.overnight?.hotels.map((el, index) => {
                    return (
                        <HotelCard
                            key={el._id}
                            hotel={el as IHotel & IHotelId}
                            handleClick={handleClick}
                            onDelete={() => handleDeleteHotel(dayIndex, el._id as string)}
                            index={index}
                        />
                    )
                })
            }
        </div>
    )
}