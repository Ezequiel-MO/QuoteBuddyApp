import { Icon } from '@iconify/react'
import styles from './render.module.css'
import { useCurrentProject } from '../../../../../hooks'

export const DayEvents = ({ day, event, handleDeleteEvent, dayIndex }) => {

    const {dragAndDropEvent, currentProject } =useCurrentProject()

    const handleDragStart = (e, el, index , dayIndex , event) => {
        e.dataTransfer.setData("dayEventId", el._id); 
        e.dataTransfer.setData("indexDayEvent" , index) 
        e.dataTransfer.setData("dayStartIndex" , dayIndex)
        e.dataTransfer.setData("timeOfEvent", event)
    }

    const handleDrop = (e, index) => {
        e.preventDefault();
        const startIndexDayEvent = e.dataTransfer.getData("indexDayEvent") 
        const dayStartIndex = e.dataTransfer.getData("dayStartIndex")
        const timeOfEventStart = e.dataTransfer.getData("timeOfEvent")
        dragAndDropEvent({
            startIndexDayEvent,
            dayStartIndex:Number(dayStartIndex),
            timeOfEventStart,
            index,
            event,
            dayIndex,
            copyDayEvents:[...day[event]]
        })
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    return (
        <>
            { day[event].map((el, index) => { 
                return (
                    <div
                        key={el._id}
                        className={styles.list}
                        draggable
                        onDragStart={(e) => handleDragStart(e, el , index, dayIndex ,event)}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragOver={(e) => handleDragOver(e)}
                    >
                        <p style={{ fontSize: '16px' }}>{el.name}</p>
                        <span
                            className={styles.deleted}
                            onClick={() => handleDeleteEvent(dayIndex, event, el._id)}
                        >
                            <Icon icon="lucide:delete" color="#ea5933" />
                        </span>
                    </div>
                )
            })}
        </>
    )
}