import { useEffect } from "react"
import styles from "./GiftProyect.module.css"

export const InputGiftQty = ({
    gift,
    data,
    setData,
    handleChange,
    handleEdit,
    index
}) => {

    useEffect(() => {
        if (gift?.qty) {
            setData(gift.qty)
        }else{
            setData(1)
        }
    }, [gift])

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) { // 13 es el código de la tecla Enter
            handleEdit( index);
        }
    }

    return (
        <input
            key={index}
            type="number"
            className={styles.giftPrice}
            value={data}
            onChange={(e) => handleChange(e , index)}
            onBlur={() => handleEdit(index)}
            onKeyDown={(e) => handleKeyDown(e)}
            autoFocus
        />
    )
}