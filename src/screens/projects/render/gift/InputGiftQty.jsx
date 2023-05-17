import { useEffect } from "react"
import styles from "./GiftProyect.module.css"

export const InputGiftQty = ({
    gift,
    data,
    setData,
    handleChange,
    handleEdit,
    index,
    type,
    activate
}) => {

    useEffect(() => {
        if (gift?.qty) {
            setData({
                ...data,
                qty: gift.qty,
                price: gift.price
            })
        } else {
            setData({
                ...data,
                qty: gift.qty,
                price: gift.price
            })
        }
    }, [index])

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) { // 13 es el código de la tecla Enter
            handleEdit(-1, type, activate, index);
        }
    }

    return (
        <div>
            <span>{type}: </span>
            <input
                key={index}
                type="number"
                className={styles.giftPrice}
                style={{width:"70px"}}
                name={type}
                value={data[type]}
                onChange={(e) => handleChange(e)}
                onBlur={() => handleEdit(-1, type, activate, index)}
                onKeyDown={(e) => handleKeyDown(e)}
                autoFocus
            />
        </div>
    )
}