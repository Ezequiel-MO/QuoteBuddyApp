import styles from "./GiftProyect.module.css"

export const InputGiftQty = ({
    data,
    handleChange,
    editMode,
    handleEdit
}) => {

    const handleKeyDown =(event)=> {
        if (event.keyCode === 13) { // 13 es el código de la tecla Enter
            handleEdit(editMode);
        }
    }

    return (
            <input
                type="number"
                className={styles.giftPrice}
                value={data}
                onChange={(e) => handleChange(e)}
                onBlur={() => handleEdit(editMode)}
                onKeyDown={(e) => handleKeyDown(e)}
                autoFocus
            />
    )
}