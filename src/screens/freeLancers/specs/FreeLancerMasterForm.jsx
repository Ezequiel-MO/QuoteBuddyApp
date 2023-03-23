import { useState } from "react"
import styles from "../FreeLancer.module.css"
import { getInitialValues } from "./FreeLancerFormInitialValues"
import { getValidationSchema, FreeLancerFormFields } from "../"


export const FreeLancerMasterForm = ({
    freeLancer,
    handleSubmit,
}) => {

    const [data, setData] = useState(getInitialValues(freeLancer))
    const [errors, setErrors] = useState({})

    const update = Object.keys(freeLancer).length > 0 ? true : false 

    const typeFreeLancer = ['guide', 'hostess', 'travel-director', 'account-manager']

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleSelectLocation = (event) => {
        setData({
            ...data,
            city: event.target.value
        })
    }


    const validate = async () => {
        try {
            await getValidationSchema.validate(data, { abortEarly: false });
            return true;
        } catch (err) {
            const errors = {};
            err.inner.forEach((el) => {
                errors[el.path] = el.message;
            });
            setErrors(errors);
            return false;
        }
    }


    const handleSubmitForm = async (event) => {
        event.preventDefault();
        const isValid = await validate();
        if (isValid) {
            handleSubmit(event, data , update);
        }
    }

    return (
        <div className={styles.divForm} >
            <form onSubmit={handleSubmitForm} >
                <FreeLancerFormFields
                    data={data}
                    setData={setData}
                    errors={errors}
                    typeFreeLancer={typeFreeLancer}
                    handleChange={handleChange}
                    handleSelectLocation={handleSelectLocation}
                />
            </form>
        </div>
    )
}