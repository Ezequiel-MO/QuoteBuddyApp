import { ErrorMessage, Field } from 'formik'
import { useState } from "react"
import styles from "./formProyect.module.css"

export const CompanyAndClientSelect = (props) => {
    const { label,
        name,
        options,
        valueCompany,
        valueClient,
        handleChange,
        ...rest
    } = props

    const [searchTerm, setSearchTerm] = useState("")


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }

    const companyEmployees = valueCompany && options.length > 0 && options.find(el =>
        el._id === valueCompany
    ).employees


    const filteredOptions = options.filter(el =>
        el.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    )


    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <br />
            <input
                style={{ marginBottom: "10px" }}
                className={styles.search}
                type="text"
                placeholder="search company..."
                value={searchTerm}
                onChange={event => handleSearch(event)}
            />
            <br />
            <Field
                id={name}
                name={name}
                value={valueCompany}
                as='select'
                {...rest}
                className={styles.selectCompany}
            >
                <option value='' onChange={event => handleChange(event)} >
                    {filteredOptions.length > 0 
                    ? `Select an company  (Search result: ${filteredOptions.length })` 
                    : "no company exists"}
                </option>
                
                {filteredOptions?.map((option) => (
                    <option key={option._id} value={option._id} onChange={event => handleChange(event)} >
                        Company: {option.name}
                    </option>
                ))}
            </Field>

            <label className={styles.labelClient} >
                Client Acc.Manager
            </label>
            <Field
                id="clientAccManager"
                name="clientAccManager"
                value={valueClient}
                as="select"
                {...rest}
                className={styles.selectClient}
            >
                <option value="">
                    {valueCompany ? "--- Select an option ---" : "--First select a company--"}
                </option>
                {
                    companyEmployees &&
                    companyEmployees.map(el => (
                        <option key={el._id} value={el._id} >
                            {`${el.firstName} ${el.familyName} `}
                        </option>
                    ))
                }
            </Field>
            <br />
            <ErrorMessage name={name} component='span' className='error-message' />

            <div style={{ position: "relative", left: "40%", marginLeft: "20%" }}>
                <ErrorMessage name="clientAccManager" component='span' className='error-message' />
            </div>

        </div>
    )
}