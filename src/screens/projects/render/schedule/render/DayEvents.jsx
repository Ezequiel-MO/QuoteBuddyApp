import { Icon } from '@iconify/react'
import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"; // instale esta libreria 
import styles from "./render.module.css"
import { useCurrentProject } from '../../../../../hooks'


export const DayEvents = ({ day, event, handleDeleteEvent, dayIndex }) => {

    //esto hay sacar y que funcione con redux
    const [items, setItems] = useState(day[event])
    const {dropAndDrag} = useCurrentProject()

    const handleOnDragEnd = (result) => {
        dropAndDrag({result , day ,event})
        // console.log(result.destination)
        if (!result.destination) {
            return
        }
        const itemsCopy = [...items]
        // console.log(itemsCopy)
        const [reorderedItem] = itemsCopy.splice(result.source.index, 1) // con destruturing agarro el elemento que voy a mover , con splice agarro el elemento del array por su index e indico que agarro solamente 1
        itemsCopy.splice(result.destination.index, 0, reorderedItem) // agrego el elemento y con "0" le digo que no elemine ninguno
        setItems(itemsCopy)
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd} >

            <>
                <Droppable droppableId={event} direction="vertical">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={styles.list}
                        >
                            {items.map((el, index) => ( // para que funcione el deleted aca va "day[event]"
                                <Draggable key={el._id} draggableId={el._id} index={index} >
                                    {(provided) => (
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            <p style={{ fontSize: "16px", maxWidth: "200px", marginTop: "8px" }}>
                                                {el.name}
                                            </p>
                                            <span
                                                className={styles.deleted}
                                                onClick={() =>
                                                    handleDeleteEvent(dayIndex, event, el._id)
                                                }
                                            >
                                                <Icon icon="arcticons:whatsdeleted" color="#ea5933" />
                                            </span>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </>
        </DragDropContext>
    )
}