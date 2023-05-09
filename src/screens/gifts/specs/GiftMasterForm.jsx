import { useState, useRef } from "react"
import { GiftFormFields } from "../"
import { getInitialValues } from "./GiftFormInitialValues"
import { ModalPictures } from '../../../components/molecules'
import { ShowImagesButton } from '../../../components/atoms'
import styles from "../Gift.module.css"


export const GiftMasterForm = ({ gift, handleSubmit, formData, setFormData }) => {
    const fileInput = useRef()
    const [data, setData] = useState(getInitialValues(gift, formData))
    const [open, setOpen] = useState(false)

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

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        setFormData(data)
        await handleSubmit(data, fileInput.current.files ?? [], "gifts" ,update)
    }


    return (
        <div className={styles.divForm} >
            <ModalPictures
                screen={gift}
                submitForm={handleSubmit}
                open={open}
                setOpen={setOpen}
                initialValues={data}
                multipleCondition={false}
                nameScreen="gifts"
            />
            <form onSubmit={handleSubmitForm} className="relative" >
                <GiftFormFields
                    data={data}
                    setData={setData}
                    handleChange={handleChange}
                    fileInput={fileInput}
                    update={update}
                    setOpen={setOpen}
                />
                <div style={{position:"absolute", marginLeft:"80%", marginTop:"-110px" }}>
                    <ShowImagesButton name={update} setOpen={setOpen} />
                </div>
            </form>
        </div>
    )
}