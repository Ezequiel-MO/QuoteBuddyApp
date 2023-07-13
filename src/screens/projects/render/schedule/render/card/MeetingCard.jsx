import { Icon } from '@iconify/react'
import {DeleteIcon} from "./DeleteIcon"
import styles from '../../../DayEvents.module.css'

export const MeetingCard = ({meeting ,onDelete , dayIndex , index }) =>{
    const deletedIcon =
		' hover:text-gray-700 hover:scale-125 hover:transition hover:duration-150 hover:ease-in-out'
    return(
        <div id={index} className={styles.cardHotel} style={{ cursor: "pointer" }} >
            <span className={deletedIcon} style={{color:"white", marginRight:"5px", fontSize:"20px"}} >
                <Icon icon="ph:coffee-bold"  />
            </span>
            <p className='truncate' >{meeting.hotelName}</p>
            <DeleteIcon id={meeting.hotelName + dayIndex} onDelete={onDelete} />
        </div>
    )

}