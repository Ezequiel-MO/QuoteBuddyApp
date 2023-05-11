import { useNavigate } from "react-router-dom"
import { Icon } from '@iconify/react'
import { useAuth } from "../../../hooks"
import { ButtonDeleted } from "../../../components/atoms"
import { formatMoney } from '../../../helper'
import styles from "../Gift.module.css"

export const GiftListItem = ({ 
    gifts,
    setGifts, 
    canBeAddedToProject, 
    addGiftToProject 
}) => {
    const navigate = useNavigate()
    const { auth } = useAuth()

    const handleNavigate = (gift) => {
        navigate('/app/gift/specs', { state: { gift } })
    }

    const handleClick = (gift) =>{
        addGiftToProject(gift)
        navigate('/app/project/schedule')
    }

    return (
        <div className={styles.giftList}>
            {
                gifts.map((gift) => {
                    return (
                        <div key={gift._id}
                            className={styles.cardGift}
                        >
                            <img
                                src={gift.imageContentUrl[0]}
                                className={styles.giftImage}
                                loading="lazy"
                            />
                            <h3 className={styles.giftName} >
                                {gift.name}
                            </h3>
                            <div className={styles.giftDetails}>
                                {
                                    canBeAddedToProject &&
                                    <span className={styles.iconAdd} onClick={()=>handleClick(gift)}>
                                        <Icon icon="material-symbols:add-box-outline-rounded" />
                                    </span>
                                }
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