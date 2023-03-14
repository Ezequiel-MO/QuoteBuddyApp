import { Icon } from '@iconify/react'
import styles from './render.module.css'
import { useState } from 'react'
import { useCurrentProject } from '../../../../../hooks'

export const DayEvents = ({ day, event, handleDeleteEvent, dayIndex }) => {

    const {dragAndDropEvent, currentProject } =useCurrentProject()

    // console.log(currentProject.schedule[dayIndex][event])

    const handleDragStart = (e, el, index , dayIndex , event) => {
        // console.log(dayIndex)
        // console.log(event)
        e.dataTransfer.setData("dayEventId", el._id); // guardo el _id del "evento" seleccionado
        e.dataTransfer.setData("indexDayEvent" , index) // guardo el index del array del "evento" seleccionado
        e.dataTransfer.setData("dayStartIndex" , dayIndex)
        e.dataTransfer.setData("timeOfEvent", event)
    }

    const handleDrop = (e, index) => {
        e.preventDefault();
        const indexDayEvent = e.dataTransfer.getData("indexDayEvent") //obtengo el index del "evento" que seleccione
        // console.log(index)

        
        //esto esta de prueba
        const dayStartIndex = e.dataTransfer.getData("dayStartIndex")
        const timeOfEvent = e.dataTransfer.getData("timeOfEvent")
        const copy = [ ...currentProject.schedule[dayStartIndex][timeOfEvent]]
        const [ejem] = copy.splice(indexDayEvent , 1)
        console.log(timeOfEvent)
        if(timeOfEvent === event){
            copy.splice(index, 0 , ejem)
            dragAndDropEvent({event  , dayIndex , copyDayEvents:copy})
            return
        }
        // const arrayFinal =  [...day[event]]
        // arrayFinal.splice(index , 0 , ejem)
        //termina aca
        

        const copyDayEvents = [...day[event]]
        // console.log(copyDayEvents)
        const [dayEvent] = copyDayEvents.splice(indexDayEvent, 1)
        copyDayEvents.splice(index, 0, dayEvent)
        dragAndDropEvent({event , dayEvent , dayIndex , copyDayEvents}) // le paso el state a redux , asi funciona solo en ese event y en ese array
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