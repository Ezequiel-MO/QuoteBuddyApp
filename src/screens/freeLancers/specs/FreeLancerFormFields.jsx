import {SelectTypeFreelancer , SelectLocation} from "../"
import styles from "../FreeLancer.module.css"

export const FreeLancerFormFields = ({
    data,
    setData,
    update,
    typeFreeLancer,
    errors,
    handleChange,
    handleSelectLocation
}) => {
    return (
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
                    onChange={event => handleChange(event)}
                />
                {errors.firstName && !data.firstName &&  (
                    <p className={styles.validationError}>{errors.firstName}</p>
                )}
                <label >Family Name</label>
                <input
                    className={styles.inputText}
                    type="text"
                    name="familyName"
                    value={data.familyName}
                    onChange={(event) => handleChange(event)}
                />
                {errors.familyName && !data.familyName && (
                    <p className={styles.validationError}>{errors.familyName}</p>
                )}
                <label >Email</label>
                <input
                    className={styles.inputText}
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(event) => handleChange(event)}
                />
                {errors.email && (
                    <p className={styles.validationError}>{errors.email}</p>
                )}
                <label >Phone</label>
                <input
                    className={styles.inputText}
                    type="tel"
                    name="phone"
                    value={data.phone}
                    onChange={(event) => handleChange(event)}
                />
                {errors.phone && (
                    <p className={styles.validationError}>{errors.phone}</p>
                )}
                <label >Half Day Rate</label>
                <input
                    className={styles.inputText}
                    type="number"
                    name="halfDayRate"
                    value={data.halfDayRate}
                    onChange={(event) => handleChange(event)}
                />
                {errors.halfDayRate && data.halfDayRate < 1 && (
                    <p className={styles.validationError}>{errors.halfDayRate}</p>
                )}
                <label >Full Day Rate</label>
                <input
                    className={styles.inputText}
                    type="number"
                    name="fullDayRate"
                    value={data.fullDayRate}
                    onChange={(event) => handleChange(event)}
                />
                {errors.fullDayRate && data.fullDayRate < 1 && (
                    <p className={styles.validationError}>{errors.fullDayRate}</p>
                )}
            </div>
            <div className="form-group mb-6">
                <label >Language Supplement</label>
                <input
                    className={styles.inputText}
                    type="number"
                    name="languageSupplement"
                    value={data.languageSupplement}
                    onChange={(event) => handleChange(event)}
                />
                {errors.languageSupplement && (
                    <p className={styles.validationError}>{errors.languageSupplement}</p>
                )}
                <label >Weekend HD Rate</label>
                <input
                    className={styles.inputText}
                    type="number"
                    name="weekendHDRate"
                    value={data.weekendHDRate}
                    onChange={(event) => handleChange(event)}
                />
                {errors.weekendHDRate && (
                    <p className={styles.validationError}>{errors.weekendHDRate}</p>
                )}
                <label >Weekend FD Rate</label>
                <input
                    className={styles.inputText}
                    type="number"
                    name="weekendFDRate"
                    value={data.weekendFDRate}
                    onChange={(event) => handleChange(event)}
                />
                {errors.weekendFDRate && (
                    <p className={styles.validationError}>{errors.weekendFDRate}</p>
                )}
                <label>Type </label>
                <SelectTypeFreelancer
                    typeFreeLancer={typeFreeLancer}
                    type={data.type}
                    setType={setData}
                    handleChange={handleChange}
                />
                {errors.type && !data.type && (
                    <p className={styles.validationError}>{errors.type}</p>
                )}
                <label >Location</label>
                <SelectLocation
                    handleChange={handleSelectLocation}
                    city={data.city}
                />
                {errors.city && !data.city && (
                    <p className={styles.validationError}>{errors.city}</p>
                )}
            </div>
            <input
                type="submit"
                className="cursor-pointer 
                        py-2 
                        px-10 
                        hover:bg-gray-600 
                        bg-green-50 
                        text-black-50 
                        hover:text-white-50 
                        font-bold
                        uppercase 
                        rounded-lg"
                value={update ?  "Edit FreeLancer Form" : "Save new FreeLancer"}
            />
        </fieldset>
    )
}