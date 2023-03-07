import { ErrorMessage, Field } from 'formik'
import { useGetCompany } from "../../../../hooks/"
import styles from "./formProyect.module.css"

export const ClientSelect = ({ valueClient, valueCompany }) => {

    const { company, isLoading } = useGetCompany(valueCompany)

    const employees = !isLoading ? company.employees : []

    return (
        <div
        className={ styles.divClient }
            style={valueCompany ? { position: "relative", marginLeft: "200px", bottom: "35px" }
                : { position: "relative", marginLeft: "200px", bottom: "62px" }}
        >
            <label className={ styles.labelClient} >
                Client Acc.Manager
            </label>
            <Field
                id="clientAccManager"
                name="clientAccManager"
                value={valueClient}
                as="select"
                // {...rest}
                className={styles.selectClient}
            >
                <option value="">
                    {valueCompany ? "--- Select an option ---" : "--First select a company--"}
                </option>
                {
                    employees &&
                    employees.map(el => (
                        <option key={el._id} value={el._id} >
                            {`${el.firstName} ${el.familyName} `}
                        </option>
                    ))
                }
            </Field>
            <div style={{ position: "relative", left: "20%", marginLeft: "10%" }}>
                <ErrorMessage name="clientAccManager" component='span' className='error-message' />
            </div>
        </div>
    )

}