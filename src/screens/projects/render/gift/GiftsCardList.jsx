import { useState, useEffect } from "react"
import { Icon } from '@iconify/react'
import { formatMoney } from '../../../../helper'
import { InputGiftQty } from "./InputGiftQty"
import styles from "./GiftProyect.module.css"

export const GiftsCardList = ({ gifts, handleDeleteGift, editGif }) => {
    const [editMode, setEditMode] = useState(-1)
    const [data, setData] = useState(1)


    const handleEdit = (index) => {
        // Si el índice que pasa "InputGiftQty" lo cerramos
        if (index === editMode) {
            setEditMode(-1);
        } else {
            setEditMode(index);
        }
    }

    const handleChange = (event) => {
        const newNumer = event.target.value;
        editGif({ qty: newNumer > 0 ? newNumer : 1 })
        setData(newNumer)
    }


    return (
        <div className={styles.giftList}>
            {
                gifts.map((gift, index) => (
                    <div key={index} className={styles.cardGift}>
                        <img
                            src={gift.imageContentUrl[0]}
                            className={styles.giftImage}
                            loading="lazy"
                        />
                        <h3 className={styles.giftName} >
                            {gift.name}
                        </h3>
                        <div className={styles.giftDetails}>
                            <div>
                                {
                                    editMode === index &&
                                    <InputGiftQty
                                        data={data}
                                        handleChange={handleChange}
                                        handleEdit={handleEdit}
                                        gift={gift}
                                        setData={setData}
                                        index={index}
                                    />
                                }
                                {
                                    editMode !== index &&
                                    <p className={styles.giftPrice} onDoubleClick={() => handleEdit(index)}>
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