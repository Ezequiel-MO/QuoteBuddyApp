import { Icon } from '@iconify/react'
import styles from "./GiftProyect.module.css"


export const CardAddGift = ({ navigate }) => {
    return (
        <div
            className={styles.addGift}
            onClick={() => navigate('/app/gift')}
        >
            <span style={{ color:"white" , fontSize: "55px" , textAlign:"center" }}>
                <Icon icon="fluent:gift-card-add-20-regular" />
            </span>
            <h1 style={{color:"white" , fontSize:"25px"}}>
                ADD GIFT
            </h1>
        </div>
    )
}