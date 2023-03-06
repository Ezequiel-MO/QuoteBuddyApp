import { ErrorMessage, Field } from 'formik'
import { useState } from "react"
import styles from "./formProyect.module.css"
import { useGetCompany } from "../../../../hooks/"
import { ClientSelect } from "./ClientSelect"

export const CompanySelect = (props) => {
    const { label,
        name,
        options,
        valueCompany,
        valueClient,
        ...rest
    } = props
    
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    }


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
                <option value='' >
                    {filteredOptions.length > 0
                        ? `Select an company  (Search result: ${filteredOptions.length})`
                        : "no company exists"}
                </option>

                {filteredOptions?.map((option) => (
                    <option key={option._id} value={option._id} >
                        Company: {option.name}
                    </option>
                ))}
            </Field>

            <div>
                <ErrorMessage name={name} component='span' className='error-message' />
            </div>

        </div>
    )
}