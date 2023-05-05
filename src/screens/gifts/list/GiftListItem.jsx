import { useNavigate} from "react-router-dom"
import { Icon } from '@iconify/react'
import { useAuth } from "../../../hooks"
import { ButtonDeleted } from "../../../components/atoms"
import { formatMoney } from '../../../helper'
import styles from "../Gift.module.css"

export const GiftListItem = ({ gifts, setGifts }) => {
    const navigate = useNavigate()
    const { auth } = useAuth()

    const handleNavigate = (gift) => {
        navigate('/app/gift/specs', { state: { gift } })
    }

    return (
        <div className={styles.giftList}>
            {
                gifts.map((gift) => {
                    return (
                        <div key={gift._id}
                            className={styles.cardGift}
                        >
                            <img src={gift.imageContentUrl[0]} loading="lazy" className={styles.giftImage} />
                            <h3 className={styles.giftName} >
                                {gift.name}
                            </h3>
                            <div className={styles.giftDetails}>
                                <span className={styles.iconEdit}
                                    onClick={() => handleNavigate(gift)}
                                >
                                    <Icon icon="mdi:database-edit-outline" />
                                </span>
                                <p className={styles.giftPrice}>
                                    {formatMoney(gift.price)}
                                </p>
                                <span style={{ fontSize: "20px" }}>
                                    {
                                        auth.role === 'admin' &&
                                        <ButtonDeleted
                                            endpoint={"gifts"}
                                            ID={gift._id}
                                            setter={setGifts}
                                            items={gifts}
                                        />
                                    }
                                </span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}