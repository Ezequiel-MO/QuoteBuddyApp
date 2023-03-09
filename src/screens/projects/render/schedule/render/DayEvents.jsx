import { Icon } from '@iconify/react'
import styles from "./render.module.css"

export const DayEvents = ({ day, event, handleDeleteEvent, dayIndex }) => {
    
    return (
        <>
            {
                day[event].map((el) => {
                    return (
                        <div key={el._id} className={styles.list}>
                            <p style={{ fontSize: "16px" }}>
                                {el.name}
                            </p>
                            <span
                                className={styles.deleted}
                                onClick={() => handleDeleteEvent(dayIndex, event, el._id)}
                            >
                                <Icon icon="lucide:delete" color="#ea5933" />
                            </span>
                        </div>
                    )
                })
            }
        </>
    )
}