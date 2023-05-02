import { useState, useRef } from "react"
import { GiftFormFields } from "../"
import { getInitialValues } from "./GiftFormInitialValues"
import styles from "../Gift.module.css"


export const GiftMasterForm = ({ gift, handleSubmit }) => {
    const fileInput = useRef()
    const [data, setData] = useState(getInitialValues(gift))

    const update = Object.keys(gift).length > 0 ? true : false

    const handleChange = (event) => {
        if (event.target.name === "price") {
            setData({
                ...data,
                [event.target.name]: parseFloat(event.target.value)
            })
        } else {
            setData({
                ...data,
                [event.target.name]: event.target.value
            })
        }
    }

    // console.log(data)

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        // const isValid = await validate();
        // if (isValid) {
        //     handleSubmit(event, data , update);
        // }
        handleSubmit(event, data, fileInput.current.files ?? [] , update)
        console.log("funciona el submit", fileInput.current)
    }

    return (
        <div className={styles.divForm} >
            <form onSubmit={handleSubmitForm}  >
                <GiftFormFields
                    data={data}
                    setData={setData}
                    handleChange={handleChange}
                    fileInput={fileInput}
                />
            </form>
        </div>
    )
}