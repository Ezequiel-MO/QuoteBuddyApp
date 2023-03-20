import {useState} from "react"
import styles from "../FreeLancer.module.css"
import { SelectTypeFreelancer } from "./SelectTypeFreelancer"
import { SelectLocation } from "./SelectLocation"
import {getInitialValues} from "./FreeLancerFormInitialValues"

export const FreeLancerMasterForm = ({
    freeLancer,
    handleSubmit
}) => {

    const [data , setData ] = useState(getInitialValues(freeLancer))

    const typeFreeLancer = ['guide', 'hostess', 'travel-director', 'account-manager']

    const handleChange = (event)=>{
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleSelectLocation =(event) =>{
        setData({
            ...data,
            city:event.target.value
        })
    }

    return (
        <div className={styles.divForm} >
            <form onSubmit={(event)=> handleSubmit(event , data) } >
                <fieldset className="grid grid-cols-2 gap-4">
                    <legend>
                        <h1 className="text-2xl mb-4">
                            General FreeLancer Data
                        </h1>
                    </legend>
                    <div className="form-group mb-6">
                        <label htmlFor="">First Name</label>
                        <input
                            className={styles.inputText}
                            type="text"
                            name="firstName"
                            value={data.firstName}
                            onChange={event =>handleChange(event)}
                        />
                        <label >Family Name</label>
                        <input
                            className={styles.inputText}
                            type="text"
                            name="familyName"
                            value={data.familyName}
                            onChange={(event)=>handleChange(event)}
                        />
                        <label >Email</label>
                        <input
                            className={styles.inputText}
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(event)=>handleChange(event)}
                        />
                        <label >Phone</label>
                        <input
                            className={styles.inputText}
                            type="tel"
                            name="phone"
                            value={data.phone}
                            onChange={(event)=>handleChange(event)}
                        />
                        <label >Half Day Rate</label>
                        <input
                            className={styles.inputText}
                            type="number"
                            name="halfDayRate"
                            value={data.halfDayRate}
                            onChange={(event)=>handleChange(event)}
                        />
                        <label >Full Day Rate</label>
                        <input
                            className={styles.inputText}
                            type="number"
                            name="fullDayRate"
                            value={data.fullDayRate}
                            onChange={(event)=>handleChange(event)}
                        />
                    </div>
                    <div className="form-group mb-6">
                        <label >Language Supplement</label>
                        <input
                            className={styles.inputText}
                            type="number"
                            name="languageSupplement"
                            value={data.languageSupplement}
                            onChange={(event)=>handleChange(event)}
                        />
                        <label >Weekend HD Rate</label>
                        <input
                            className={styles.inputText}
                            type="number"
                            name="weekendHDRate"
                            value={data.weekendHDRate}
                            onChange={(event)=>handleChange(event)}
                        />
                        <label >Weekend FD Rate</label>
                        <input
                            className={styles.inputText}
                            type="number"
                            name="weekendFDRate"
                            value={data.weekendFDRate}
                            onChange={(event)=>handleChange(event)}
                        />
                        <label htmlFor="">Type </label>
                        <SelectTypeFreelancer
                            typeFreeLancer={typeFreeLancer}
                            type={data.type}
                            setType={setData}
                            handleChange={handleChange}
                        />
                        <label htmlFor="">Location</label>
                        <SelectLocation handleChange={handleSelectLocation} />
                    </div>
                    <input
                        type="submit"
                        className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
                        value='Save new form Company'
                    />
                </fieldset>
            </form>
        </div>
    )
}