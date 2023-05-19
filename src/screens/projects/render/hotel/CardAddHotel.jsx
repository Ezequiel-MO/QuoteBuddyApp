import { Icon } from '@iconify/react'
import styles from '../DayEvents.module.css'

export const CardAddHotel = ({navigate }) => {
    return (
        <div
            className={styles.addHotel}
            onClick={() => navigate('/app/hotel')}
        >
            <h2 className={styles.textAddHotel}>
                <span style={{ color: "white", marginRight: "10px", fontSize: "28px" }}>
                    <Icon icon="bi:building-add" />
                </span>
                ADD HOTEL
            </h2>
        </div>
    )
}