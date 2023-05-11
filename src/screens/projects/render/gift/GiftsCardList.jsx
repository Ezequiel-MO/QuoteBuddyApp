import { useState, useEffect } from "react"
import { Icon } from '@iconify/react'
import { formatMoney } from '../../../../helper'
import { InputGiftQty } from "./InputGiftQty"
import styles from "./GiftProyect.module.css"

export const GiftsCardList = ({ gifts, handleDeleteGift, editGif }) => {
    const [editMode, setEditMode] = useState(false)
    const [data, setData] = useState(1)

    const handleEdit = (editMode) => {
        if (!editMode) {
            setEditMode(true)
        } else {
            setEditMode(false)
        }
    }

    function handleChange(event) {
        const newNumer = event.target.value;
        // if (newNumer <= 0) {
        //     setData(1);
        // } else {
        //     setData(newNumer);
        // }
        editGif({ qty: newNumer > 0 ? newNumer : 1 })
        setData(newNumer)
    }

    return (
        <div className={styles.giftList}>
            {
                gifts.map((gift, index) => (
                    <div key={gift._id} className={styles.cardGift}>
                        <img
                            src={gift.imageContentUrl[0]}
                            className={styles.giftImage}
                            loading="lazy"
                        />
                        <h3 className={styles.giftName} >
                            {gift.name}
                        </h3>
                        <div className={styles.giftDetails}>
                            <div >
                                {
                                    editMode &&
                                    <InputGiftQty
                                        data={data}
                                        editMode={editMode}
                                        handleChange={handleChange}
                                        handleEdit={handleEdit}
                                    />
                                }
                                {
                                    !editMode &&
                                    <p className={styles.giftPrice} onDoubleClick={() => handleEdit(editMode)} >
                                        Qty: {gift?.qty ?? 1}
                                    </p>
                                }
                            </div>
                            <p className={styles.giftPrice}>
                                {formatMoney(gift.qty ?
                                    gift.price * gift.qty
                                    :
                                    gift.price * 1
                                )}
                            </p>
                            <span
                                className={styles.deleted}
                                onClick={() => handleDeleteGift(gift._id)}
                            >
                                <Icon icon="lucide:delete" />
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}