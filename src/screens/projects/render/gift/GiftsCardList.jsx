import { useState, useEffect } from "react"
import { Icon } from '@iconify/react'
import { formatMoney } from '../../../../helper'
import { InputGiftQty } from "./InputGiftQty"
import { GiftModal } from "./giftModal/GiftModal"
import styles from "./GiftProyect.module.css"

export const GiftsCardList = ({ gifts, handleDeleteGift, editGift }) => {
    const [editIndex, setEditIndex] = useState(-1)
    const [activate, setActivate] = useState(false)
    const [data, setData] = useState({
        qty: 1,
        price: ""
    })
    const [edit, setEdit] = useState({
        qty: "",
        price: "",
    })
    const [open, setOpen] = useState(false)
    const [giftModal, setGiftModal] = useState({})


    const handleEdit = (index, type, activate, indexGif) => {
        if (!activate) {
            setEditIndex(index)
            setEdit({
                ...edit,
                [type]: type,
            })
            setActivate(true)
        } else {
            setEditIndex(index)
            setEdit({
                ...edit,
                [type]: ""
            })
            setActivate(false)
            editGift({
                qty: Number(data.qty),
                indexGift: indexGif,
                price: Number(data.price)
            })
        }
    }

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleClick = (e, index, gift) => {
        setEditIndex(index)
        setGiftModal(gift)
        setOpen(true)
    }


    return (
        <>
            <GiftModal
                open={open}
                setOpen={setOpen}
                gift={giftModal}
                index={editIndex}
                setEditIndex={setEditIndex}
            />
            <div className={styles.giftList}>
                {
                    gifts.map((gift, index) => {

                        return (
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
                                    <span
                                        className={styles.eye}
                                        onClick={(e) => handleClick(e, index, gift)}
                                    >
                                        <Icon icon="ic:baseline-remove-red-eye" />
                                    </span>
                                    <div>
                                        {
                                            editIndex === index && edit.qty &&
                                            <InputGiftQty
                                                data={data}
                                                handleChange={handleChange}
                                                handleEdit={handleEdit}
                                                gift={gift}
                                                setData={setData}
                                                index={index}
                                                type="qty"
                                                activate={activate}
                                            />
                                        }
                                        {
                                            editIndex !== index &&
                                            <p
                                                className={styles.giftQty}
                                                onDoubleClick={() => handleEdit(index, "qty", activate)}
                                            >
                                                Qty: {gift?.qty ?? 1}
                                            </p>
                                        }
                                    </div>
                                    <div>
                                        {
                                            editIndex === index && edit.price &&
                                            <InputGiftQty
                                                data={data}
                                                handleChange={handleChange}
                                                handleEdit={handleEdit}
                                                gift={gift}
                                                setData={setData}
                                                index={index}
                                                type="price"
                                                activate={activate}
                                            />
                                        }
                                        {
                                            editIndex !== index &&
                                            <p
                                                className={styles.giftPrice}
                                                onDoubleClick={() => handleEdit(index, "price", activate)}
                                            >
                                                {formatMoney(gift.price)}
                                            </p>
                                        }
                                    </div>
                                    <span
                                        className={styles.deleted}
                                        onClick={() => handleDeleteGift(gift._id)}
                                    >
                                        <Icon icon="lucide:delete" />
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}